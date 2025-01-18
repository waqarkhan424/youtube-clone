import { Controller, Post, Get, Patch, Body, Param, Query, UseInterceptors, UploadedFiles, Delete, } from '@nestjs/common';
import { VideoService } from './video.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';


@Controller('videos')
export class VideoController {
    constructor(private readonly videoService: VideoService) { }


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
                    destination: (req, file, callback) => {
                        if (file.fieldname === 'video') {
                            callback(null, './uploads/videos');
                        } else if (file.fieldname === 'thumbnail') {
                            callback(null, './uploads/thumbnails');
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



    @Get()
    async findAll(@Query('q') query: string) {
        return this.videoService.findAll(query);
    }



    // ===========================
    //        USER ROUTE
    // ===========================
    @Get('user/:userId')
    async findByUser(@Param('userId') userId: string) {
        return this.videoService.findByUserId(userId);
    }


    // ===========================
    //      SINGLE VIDEO ROUTE
    // ===========================

    @Get(':id')
    async findVideoById(@Param('id') videoId: string) {
        return this.videoService.findVideoById(videoId);
    }




    // Add a new route for deleting a video
    @Delete(':id')
    async deleteVideo(@Param('id') videoId: string) {
        return this.videoService.deleteVideo(videoId);
    }





    // Fetch comments for a video
    @Get(':id/comments')
    async getComments(@Param('id') videoId: string) {
        return this.videoService.getComments(videoId);
    }

    // Add a comment to a video
    @Post(':id/comment')
    async addComment(@Param('id') videoId: string, @Body() commentData: { userId: string; text: string }) {
        return this.videoService.addComment(videoId, commentData);
    }


    // Increment video views
    @Patch(':id/views')
    async incrementViews(@Param('id') videoId: string) {
        // Call service to increment view count
        const updatedVideo = await this.videoService.incrementViews(videoId);
        return updatedVideo;
    }





    // Like a video
    @Patch(':id/like')
    async likeVideo(@Param('id') videoId: string, @Body('userId') userId: string) {
        return this.videoService.likeVideo(videoId, userId);
    }

    // Dislike a video
    @Patch(':id/dislike')
    async dislikeVideo(@Param('id') videoId: string, @Body('userId') userId: string) {
        return this.videoService.dislikeVideo(videoId, userId);
    }


}
