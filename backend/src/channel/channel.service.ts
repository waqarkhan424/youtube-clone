import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Channel } from './channel.schema';

@Injectable()
export class ChannelService {
    constructor(@InjectModel(Channel.name) private channelModel: Model<Channel>) { }

    async createChannel(channelData: any): Promise<Channel> {
        const newChannel = new this.channelModel(channelData);
        return newChannel.save();
    }

    async findChannelsByUser(ownerId: string): Promise<Channel[]> {
        return this.channelModel.find({ ownerId }).exec();
    }

    async addVideoToChannel(channelId: string, videoId: string): Promise<Channel> {
        return this.channelModel.findByIdAndUpdate(
            channelId,
            { $push: { videos: videoId } },
            { new: true },
        ).exec();
    }
}
