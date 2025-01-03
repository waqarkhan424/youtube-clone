import { Controller, Get, Post, Patch, Body, Param, Query } from '@nestjs/common';
import { VideoService } from './video.service';

@Controller('videos')
export class VideoController {
    constructor(private readonly videoService: VideoService) { }

    // Create a video associated with a specific user
    @Post()
    create(@Body() videoData: any) {
        const userId = videoData.userId; // Extract this from authentication in production.
        return this.videoService.create(videoData, userId);
    }

    // Fetch all videos (with optional search and sorting)
    @Get()
    findAll(@Query('q') query: string, @Query('sort') sort: string) {
        return this.videoService.findAll(query, sort);
    }

    // Fetch videos for a specific user
    @Get(':userId')
    findByUser(@Param('userId') userId: string) {
        return this.videoService.findByUser(userId);
    }

    // Increment video views
    @Patch(':id/views')
    incrementViews(@Param('id') videoId: string) {
        return this.videoService.incrementViews(videoId);
    }

    // Like a video
    @Patch(':id/like')
    likeVideo(@Param('id') videoId: string) {
        return this.videoService.likeVideo(videoId);
    }

    // Dislike a video
    @Patch(':id/dislike')
    dislikeVideo(@Param('id') videoId: string) {
        return this.videoService.dislikeVideo(videoId);
    }

    // Add a comment
    @Post(':id/comment')
    addComment(@Param('id') videoId: string, @Body() comment: { userId: string; text: string }) {
        return this.videoService.addComment(videoId, comment);
    }
}
