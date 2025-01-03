import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Video } from './video.schema';

@Injectable()
export class VideoService {
    constructor(@InjectModel(Video.name) private videoModel: Model<Video>) { }

    // Create a video
    async create(videoData: any, userId: string): Promise<Video> {
        const newVideo = new this.videoModel({ ...videoData, userId });
        return newVideo.save();
    }

    // Fetch all videos with optional search and sorting
    async findAll(query: string, sort: string): Promise<Video[]> {
        const filter = query ? { title: { $regex: query, $options: 'i' } } : {};
        const sortOptions = sort === 'popular' ? { views: -1 } : { uploadedAt: -1 };
        //@ts-ignore
        return this.videoModel.find(filter).sort(sortOptions).exec();
    }

    // Fetch videos by userId
    async findByUser(userId: string): Promise<Video[]> {
        return this.videoModel.find({ userId }).exec();
    }

    // Increment video views
    async incrementViews(videoId: string): Promise<Video> {
        return this.videoModel.findByIdAndUpdate(
            videoId,
            { $inc: { views: 1 } },
            { new: true },
        ).exec();
    }

    // Like a video
    async likeVideo(videoId: string): Promise<Video> {
        return this.videoModel.findByIdAndUpdate(
            videoId,
            { $inc: { likes: 1 } },
            { new: true },
        ).exec();
    }

    // Dislike a video
    async dislikeVideo(videoId: string): Promise<Video> {
        return this.videoModel.findByIdAndUpdate(
            videoId,
            { $inc: { dislikes: 1 } },
            { new: true },
        ).exec();
    }

    // Add a comment
    async addComment(videoId: string, comment: { userId: string; text: string }): Promise<Video> {
        return this.videoModel.findByIdAndUpdate(
            videoId,
            { $push: { comments: comment } },
            { new: true },
        ).exec();
    }
}
