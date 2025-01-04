import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Video } from './video.schema';
import { User } from '../user/user.schema';

@Injectable()
export class VideoService {
    constructor(
        @InjectModel(Video.name) private videoModel: Model<Video>,
        @InjectModel(User.name) private userModel: Model<User>
    ) { }

    // Add a comment to a video
    async addComment(videoId: string, commentData: { userId: string; text: string }): Promise<Video> {
        const { userId, text } = commentData;

        // Fetch user details for the comment
        const user = await this.userModel.findById(userId).exec();
        if (!user) {
            throw new NotFoundException('User not found');
        }

        // Fetch the video and update with the new comment
        const video = await this.videoModel.findById(videoId).exec();
        if (!video) {
            throw new NotFoundException('Video not found');
        }

        const comment = {
            userId,
            username: user.username,
            text,
            postedAt: new Date(),
        };

        video.comments.push(comment);
        return video.save();
    }

    // Other methods for managing videos

    async uploadVideo(videoData: any, userId: string): Promise<Video> {
        const { title, url, description, channelName } = videoData;

        // Create the video
        const newVideo = new this.videoModel({
            title,
            url,
            description,
            userId,
            channelName,
        });

        return newVideo.save();
    }

    async findAll(query: string, sort: string): Promise<Video[]> {
        const filter = query ? { title: { $regex: query, $options: 'i' } } : {};
        const sortOptions = sort === 'popular' ? { views: -1 } : { uploadedAt: -1 };
        //@ts-ignore
        return this.videoModel.find(filter).sort(sortOptions).exec();
    }

    async findByChannel(userId: string, channelName: string): Promise<Video[]> {
        return this.videoModel.find({ userId, channelName }).exec();
    }

    async incrementViews(videoId: string): Promise<Video> {
        return this.videoModel.findByIdAndUpdate(
            videoId,
            { $inc: { views: 1 } },
            { new: true },
        ).exec();
    }

    async likeVideo(videoId: string): Promise<Video> {
        return this.videoModel.findByIdAndUpdate(
            videoId,
            { $inc: { likes: 1 } },
            { new: true },
        ).exec();
    }

    async dislikeVideo(videoId: string): Promise<Video> {
        return this.videoModel.findByIdAndUpdate(
            videoId,
            { $inc: { dislikes: 1 } },
            { new: true },
        ).exec();
    }
}
