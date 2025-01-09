import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VideoModule } from './video/video.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI),
    VideoModule,
    UserModule,
    AuthModule,

  ],
  controllers: [],
  providers: [],
})
export class AppModule { }








