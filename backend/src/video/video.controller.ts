import { Controller, Post, Get, Patch, Body, Param, Query, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { VideoService } from './video.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('videos')
export class VideoController {
    constructor(private readonly videoService: VideoService) { }

    // Add a comment to a video
    @Post(':id/comment')
    async addComment(
        @Param('id') videoId: string,
        @Body() comment: { userId: string; text: string }
    ) {
        return this.videoService.addComment(videoId, comment);
    }

    // Upload a video

    @Post()
    @UseInterceptors(
        FileFieldsInterceptor(
            [
                { name: 'video', maxCount: 1 },
                { name: 'thumbnail', maxCount: 1 },
            ],
            {
                storage: diskStorage({
                    destination: (req, file, cb) => {
                        if (file.fieldname === 'video') {
                            cb(null, './uploads/videos');
                        } else if (file.fieldname === 'thumbnail') {
                            cb(null, './uploads/thumbnails');
                        }
                    },
                    filename: (req, file, callback) => {
                        const uniqueSuffix =
                            Date.now() + '-' + Math.round(Math.random() * 1e9);
                        const ext = extname(file.originalname);
                        callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
                    },
                }),
            },
        ),
    )
    async uploadVideo(
        @Body() videoData: any,
        @UploadedFiles() files: {
            video?: Express.Multer.File[];
            thumbnail?: Express.Multer.File[];
        },
    ) {


        const videoFile = files.video?.[0];
        const thumbnailFile = files.thumbnail?.[0];

        if (!videoFile) {
            throw new Error('Video file is required.');
        }

        // Use BACKTICKS for strings!
        const videoUrl = `/uploads/videos/${videoFile.filename}`;
        const thumbnailUrl = thumbnailFile
            ? `/uploads/thumbnails/${thumbnailFile.filename}`
            : '';

        const userId = videoData.userId;
        return this.videoService.uploadVideo(
            {
                ...videoData,
                url: videoUrl,
                thumbnailUrl,
            },
            userId,
        );
    }



    // Fetch all videos
    @Get()
    async findAll(@Query('q') query: string) {
        return this.videoService.findAll(query);
    }

    // Fetch videos by user
    @Get(':userId')
    async findByUser(@Param('userId') userId: string) {
        return this.videoService.findByUserId(userId);
    }

    // Increment video views
    @Patch(':id/views')
    async incrementViews(@Param('id') videoId: string) {
        return this.videoService.incrementViews(videoId);
    }

    // Like a video
    @Patch(':id/like')
    async likeVideo(@Param('id') videoId: string) {
        return this.videoService.likeVideo(videoId);
    }

    // Dislike a video
    @Patch(':id/dislike')
    async dislikeVideo(@Param('id') videoId: string) {
        return this.videoService.dislikeVideo(videoId);
    }
}
