import { Controller, Post, Get, Req, UseGuards, Body, Param, UploadedFile, UseInterceptors, UnauthorizedException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { UserService } from './user.service';
import { Express } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';


@Controller('users')
export class UserController {

    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService, // Inject JwtService
    ) { }


    @UseGuards(AuthGuard('jwt')) // Use JWT authentication guard
    @Get('me')
    async getCurrentUser(@Req() req: any) {
        const userId = req.user?.id; // `req.user` will be populated by the guard
        if (!userId) {
            throw new UnauthorizedException('User not authenticated');
        }
        return this.userService.findUserById(userId);
    }





    @Post()
    @UseInterceptors(
        FileInterceptor('profilePic', {
            storage: diskStorage({
                destination: './uploads/profile-pics', // Save profile pictures in the correct folder
                filename: (req, file, callback) => {
                    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                    const ext = extname(file.originalname);
                    callback(null, `profile-${uniqueSuffix}${ext}`);
                },
            }),
        }),
    )
    async createUser(
        @Body() userData: any,
        @UploadedFile() profilePic?: Express.Multer.File,
    ) {
        if (profilePic) {
            userData.profilePic = `/uploads/profile-pics/${profilePic.filename}`; // Store the full path
        }

        // Create the user in the database
        const newUser = await this.userService.createUser(userData);

        // Generate a JWT token for the newly created user
        const token = this.jwtService.sign({ sub: newUser._id, email: newUser.email });

        // Return the user details along with the token
        return { user: newUser, token };

    }




    @Post('login')
    async login(@Body() loginData: { email: string; password: string }) {
        const user = await this.userService.validateUser(loginData.email, loginData.password);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const token = this.jwtService.sign({ sub: user.id, email: user.email });
        return { user, token }; // Return both user info and token
    }





    @Get(':id')
    async findUser(@Param('id') userId: string) {
        return this.userService.findUserById(userId);
    }
}
