import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Video, Comment } from './video.schema';
import { User } from '../user/user.schema';

@Injectable()
export class VideoService {
    constructor(
        @InjectModel(Video.name) private videoModel: Model<Video>,
        @InjectModel(User.name) private userModel: Model<User>
    ) { }




    // Add a method to delete a video
    async deleteVideo(videoId: string): Promise<void> {
        const video = await this.videoModel.findById(videoId).exec();
        if (!video) {
            throw new NotFoundException('Video not found');
        }
        await this.videoModel.deleteOne({ _id: videoId }).exec();
    }






    // Get comments
    async getComments(videoId: string): Promise<Comment[]> {
        const video = await this.videoModel.findById(videoId).exec();
        if (!video) {
            throw new NotFoundException("Video not found");
        }
        return video.comments;
    }

    // Add comment
    async addComment(videoId: string, commentData: { userId: string; text: string }): Promise<Comment> {
        const { userId, text } = commentData;

        const user = await this.userModel.findById(userId).exec();
        if (!user) {
            throw new NotFoundException("User not found");
        }

        const video = await this.videoModel.findById(videoId).exec();
        if (!video) {
            throw new NotFoundException("Video not found");
        }

        const newComment: Comment = {
            userId,
            username: user.username,
            text,
            postedAt: new Date(),
        };

        video.comments.push(newComment);
        await video.save();
        return newComment;
    }







    // Upload a video
    async uploadVideo(videoData: any, userId: string): Promise<Video> {
        const { title, url, description, thumbnailUrl } = videoData;

        // Create the video
        const newVideo = new this.videoModel({
            title,
            url,
            description,
            thumbnailUrl, // Save thumbnail URL
            userId,
        });

        const savedVideo = await newVideo.save();
        return savedVideo;

    }


    // Find all videos (optional search by query)
    async findAll(query: string): Promise<Video[]> {
        const filter = query ? { title: { $regex: query, $options: 'i' } } : {};
        return this.videoModel.find(filter).exec();
    }


    // Find videos by user ID
    async findByUserId(userId: string): Promise<Video[]> {
        return this.videoModel.find({ userId }).exec();
    }

    // Find a single video by ID
    async findVideoById(videoId: string): Promise<Video> {
        const video = await this.videoModel.findById(videoId).exec();
        if (!video) {
            throw new NotFoundException("Video not found");
        }
        return video;
    }




    // Increment views
    async incrementViews(videoId: string): Promise<Video> {
        // Increase the "views" field by 1
        return this.videoModel
            .findByIdAndUpdate(videoId, { $inc: { views: 1 } }, { new: true })
            .exec();
    }



    // Like a video
    async likeVideo(videoId: string, userId: string): Promise<Video> {
        const video = await this.videoModel.findById(videoId).exec();
        if (!video) throw new NotFoundException('Video not found');

        // If user already liked, remove the like
        if (video.likedBy.includes(userId)) {
            video.likedBy = video.likedBy.filter((id) => id !== userId);
        } else {
            // Add like, remove from dislikedBy
            video.likedBy.push(userId);
            video.dislikedBy = video.dislikedBy.filter((id) => id !== userId);
        }

        video.likes = video.likedBy.length;
        video.dislikes = video.dislikedBy.length;

        return video.save();
    }

    // Dislike a video
    async dislikeVideo(videoId: string, userId: string): Promise<Video> {
        const video = await this.videoModel.findById(videoId).exec();
        if (!video) throw new NotFoundException('Video not found');

        // If user already disliked the video, remove their dislike
        if (video.dislikedBy.includes(userId)) {
            video.dislikedBy = video.dislikedBy.filter((id) => id !== userId);
        } else {
            // Add dislike, remove from likedBy
            video.dislikedBy.push(userId);
            video.likedBy = video.likedBy.filter((id) => id !== userId);
        }

        video.likes = video.likedBy.length;
        video.dislikes = video.dislikedBy.length;

        return video.save();
    }







}
