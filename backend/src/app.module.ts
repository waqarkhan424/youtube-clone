import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VideoModule } from './video/video.module';
import { UserModule } from './user/user.module';
import { ChannelModule } from './channel/channel.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI),
    VideoModule,
    UserModule,
    ChannelModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }








