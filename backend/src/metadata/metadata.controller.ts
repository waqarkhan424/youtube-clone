import { Controller, Post, Body, Get } from '@nestjs/common';
import { MetadataService } from './metadata.service';

@Controller('metadata')
export class MetadataController {
    constructor(private readonly metadataService: MetadataService) { }

    @Post()
    create(@Body() createDto: any) {
        return this.metadataService.create(createDto);
    }

    @Get()
    findAll() {
        return this.metadataService.findAll();
    }
}




