import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Delete,
    Get,
    HttpCode,
    NotFoundException,
    Param,
    Post,
    Req,
    UseGuards,
    UseInterceptors,
    ValidationPipe,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { BcryptService } from '../shared/bcrypt/bcrypt.service';
import { User } from './user';

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {

    constructor(private readonly usersService: UsersService,
                private readonly bcryptService: BcryptService) {
    }

    @Post()
    @HttpCode(201)
    async createUser(@Body(new ValidationPipe()) user: UserDto) {
        user.password = await this.bcryptService.hash(user.password, 10);
        await this.usersService.createUser(user);
    }

    @Delete('/:id')
    async deleteUser(@Param('id') id: string) {
        const user = await this.usersService.findById(id);
        if (!user) {
            return new NotFoundException();
        }

        await user.remove();
    }
}
