import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User, UserSchema } from './user.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), // Register the User schema with Mongoose
        MulterModule.register({
            dest: './uploads', // Save uploaded files in the "uploads" folder
        }),
    ],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService], // Export the service if needed in other modules
})
export class UserModule { }



