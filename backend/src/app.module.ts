import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VideoModule } from './video/video.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI),
    VideoModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }








