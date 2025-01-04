import { Controller, Post, Get, Body, Param, UploadedFile, UseInterceptors, UnauthorizedException } from '@nestjs/common';
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



    @Post('login')
    async login(@Body() loginData: { email: string; password: string }) {
        const user = await this.userService.validateUser(loginData.email, loginData.password);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }
        return user;
    }


    @Get(':id')
    async findUser(@Param('id') userId: string) {
        return this.userService.findUserById(userId);
    }
}
