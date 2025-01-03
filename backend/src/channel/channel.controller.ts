import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { ChannelService } from './channel.service';

@Controller('channels')
export class ChannelController {
    constructor(private readonly channelService: ChannelService) { }

    @Post()
    createChannel(@Body() channelData: any) {
        return this.channelService.createChannel(channelData);
    }

    @Get('user/:ownerId')
    findChannelsByUser(@Param('ownerId') ownerId: string) {
        return this.channelService.findChannelsByUser(ownerId);
    }

    @Post(':id/add-video')
    addVideoToChannel(@Param('id') channelId: string, @Body() body: { videoId: string }) {
        return this.channelService.addVideoToChannel(channelId, body.videoId);
    }
}
