import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { BcryptModule } from '../shared/bcrypt/bcrypt.module';
import { UserSchema } from './schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]), BcryptModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
