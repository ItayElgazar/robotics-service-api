import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from './user';
import { InjectModel } from '@nestjs/mongoose';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>) {
    }

    async createUser(user: UserDto): Promise<User> {
        const createdUser = new this.userModel(user);
        return await createdUser.save();
    }

    async findById(id: string): Promise<User> {
        return await this.userModel.findOne({ _id: id }).exec();
    }

    async findByEmail(email: string): Promise<User> {
        const user = await this.userModel.findOne({ email }).exec();
        return user;
    }

    async findAll(toObject?: boolean): Promise<User[]> {
        const users = await this.userModel.find().exec();
        return toObject ? users.map(u => u.toObject()) : users;
    }
}
