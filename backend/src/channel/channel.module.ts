import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChannelController } from './channel.controller';
import { ChannelService } from './channel.service';
import { Channel, ChannelSchema } from './channel.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Channel.name, schema: ChannelSchema }]), // Register the Channel schema with Mongoose
    ],
    controllers: [ChannelController],
    providers: [ChannelService],
    exports: [ChannelService], // Export the service if needed in other modules
})
export class ChannelModule { }
