import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) { }

    async createUser(userData: any): Promise<User> {
        const newUser = new this.userModel(userData);
        return newUser.save();
    }

    async findUserById(userId: string): Promise<User> {
        return this.userModel.findById(userId).exec();
    }
}
