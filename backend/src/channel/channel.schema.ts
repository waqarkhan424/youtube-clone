import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Channel extends Document {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    description: string;

    @Prop({ required: true })
    ownerId: string; // The ID of the user who owns this channel.

    @Prop({ default: Date.now })
    createdAt: Date;

    @Prop({ default: [] })
    videos: string[]; // Array of video IDs associated with this channel.
}

export const ChannelSchema = SchemaFactory.createForClass(Channel);
