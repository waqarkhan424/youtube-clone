import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MetadataModule } from './metadata/metadata.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI),
    MetadataModule, // Connect to MongoDB
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }








