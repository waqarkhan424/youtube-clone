import { Controller, Post, Get, Patch, Body, Param, Query } from '@nestjs/common';
import { VideoService } from './video.service';

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
    async uploadVideo(@Body() videoData: any) {
        const userId = videoData.userId; // Extract from authentication in production
        return this.videoService.uploadVideo(videoData, userId);
    }

    // Fetch all videos
    @Get()
    async findAll(@Query('q') query: string, @Query('sort') sort: string) {
        return this.videoService.findAll(query, sort);
    }

    // Fetch videos by channel
    @Get(':userId/:channelName')
    async findByChannel(@Param('userId') userId: string, @Param('channelName') channelName: string) {
        return this.videoService.findByChannel(userId, channelName);
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
