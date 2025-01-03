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


    @Prop({ required: true }) // Associate with a user
    userId: string;

    @Prop({ default: 0 }) // Track video views
    views: number;

    @Prop({ default: 0 }) // Track video likes
    likes: number;

    @Prop({ default: 0 }) // Track video dislikes
    dislikes: number;

    @Prop({ type: [{ userId: String, text: String, postedAt: { type: Date, default: Date.now } }] }) // Comments
    comments: Array<{ userId: string; text: string; postedAt: Date }>;

}

export const VideoSchema = SchemaFactory.createForClass(Video);
