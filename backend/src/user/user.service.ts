import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) { }

    async createUser(userData: any): Promise<User> {
        console.log("userData:::::::::::", userData)
        const { username, email, password, channelName, description, profilePic } = userData;

        // Create a new user with channel details
        const newUser = new this.userModel({
            username,
            email,
            password,
            channels: [
                {
                    channelName,
                    description,
                    profilePic: profilePic || null, // Handle optional profilePic
                },
            ],
        });

        return newUser.save();
    }

    async findUserById(userId: string): Promise<User> {
        return this.userModel.findById(userId).exec();
    }


    async validateUser(email: string, password: string): Promise<User | null> {
        const user = await this.userModel.findOne({ email }).exec();
        if (!user || user.password !== password) {
            throw new UnauthorizedException('Invalid credentials');
        }
        return user;
    }


}
