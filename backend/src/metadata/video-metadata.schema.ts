import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class VideoMetadata extends Document {
    @Prop({ required: true })
    videoId: string;

    @Prop()
    tags: string[];

    @Prop()
    category: string;

    @Prop()
    views: number;
}

export const VideoMetadataSchema = SchemaFactory.createForClass(VideoMetadata);
