import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { VideoMetadata } from './video-metadata.schema';

@Injectable()
export class MetadataService {
    constructor(
        @InjectModel(VideoMetadata.name) private metadataModel: Model<VideoMetadata>,
    ) { }

    async create(createDto: any): Promise<VideoMetadata> {
        const createdMetadata = new this.metadataModel(createDto);
        return createdMetadata.save();
    }

    async findAll(): Promise<VideoMetadata[]> {
        return this.metadataModel.find().exec();
    }
}
