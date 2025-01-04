import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
    @Prop({ required: true })
    username: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ default: Date.now })
    joinedAt: Date;

    @Prop({ default: [] })
    channels: Array<{
        channelName: string;
        description: string;
        profilePic: string;
    }>; // Array of channel details
}

export const UserSchema = SchemaFactory.createForClass(User);
