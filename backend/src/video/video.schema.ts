import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


export interface Comment {
    userId: string;
    username: string;
    text: string;
    postedAt: Date;
    profilePic?: string; // Add profilePic as an optional field
}
@Schema()
export class Video extends Document {
    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    url: string;

    @Prop()
    description: string;

    @Prop({ default: Date.now })
    uploadedAt: Date;

    @Prop({ required: true })
    userId: string; // ID of the user who uploaded the video

    @Prop({ default: 0 })
    views: number;

    @Prop({ default: 0 })
    likes: number;

    @Prop({ default: 0 })
    dislikes: number;

    @Prop({ default: [] })
    likedBy: string[]; // Array of user IDs who liked the video

    @Prop({ default: [] })
    dislikedBy: string[]; // Array of user IDs who disliked the video

    @Prop({ required: false })
    thumbnailUrl: string; // New field for thumbnail URL

    @Prop({
        type: [
            {
                userId: String,
                username: String,
                text: String,
                postedAt: { type: Date, default: Date.now },
                profilePic: String,

            },
        ],
        default: [],
    })
    comments: Comment[];

}

export const VideoSchema = SchemaFactory.createForClass(Video);
