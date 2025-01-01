import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VideoMetadata, VideoMetadataSchema } from './video-metadata.schema';
import { MetadataService } from './metadata.service';
import { MetadataController } from './metadata.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: VideoMetadata.name, schema: VideoMetadataSchema }]),
  ],
  controllers: [MetadataController],
  providers: [MetadataService],
})
export class MetadataModule { }



