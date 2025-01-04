import { Controller, Post, Get, Body, Param, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserService } from './user.service';
import { Express } from 'express'; // Import Express types

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }


    @Post()
    @UseInterceptors(FileInterceptor('profilePic')) // Handle file upload
    async createUser(
        @Body() userData: any,
        @UploadedFile() profilePic?: Express.Multer.File
    ) {

        if (profilePic) {
            userData.profilePic = profilePic.filename; // Add file name to userData
        }

        return this.userService.createUser(userData);
    }



    @Get(':id')
    async findUser(@Param('id') userId: string) {
        return this.userService.findUserById(userId);
    }
}
