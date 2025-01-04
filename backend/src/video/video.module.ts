import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VideoController } from './video.controller';
import { VideoService } from './video.service';
import { Video, VideoSchema } from './video.schema';
import { User, UserSchema } from '../user/user.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Video.name, schema: VideoSchema },
            { name: User.name, schema: UserSchema }, // Include User schema
        ]),
    ],
    controllers: [VideoController],
    providers: [VideoService],
})
export class VideoModule { }
