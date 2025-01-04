import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post()
    async createUser(@Body() userData: any) {
        return this.userService.createUser(userData);
    }

    @Get(':id')
    async findUser(@Param('id') userId: string) {
        return this.userService.findUserById(userId);
    }
}
