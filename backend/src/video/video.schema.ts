import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

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

    @Prop({ required: true })
    channelName: string; // Channel associated with the video

    @Prop({ default: 0 })
    views: number;

    @Prop({ default: 0 })
    likes: number;

    @Prop({ default: 0 })
    dislikes: number;

    @Prop({
        type: [
            {
                userId: String,
                username: String,
                text: String,
                postedAt: { type: Date, default: Date.now },
            },
        ],
        default: [],
    })
    comments: Array<{ userId: string; username: string; text: string; postedAt: Date }>;
}

export const VideoSchema = SchemaFactory.createForClass(Video);
