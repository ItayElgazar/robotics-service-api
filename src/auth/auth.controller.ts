import { Body, ClassSerializerInterceptor, Controller, Post, UnauthorizedException, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/auth.dto';
import { User } from '../users/user';
import { UsersService } from '../users/users.service';
import { LoginInfo } from '../users/entities/login-info.entity';
import { AuthErrors } from './auth-errors.enum';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {

    constructor(private readonly authService: AuthService, private readonly userService: UsersService) {}

    @Post()
    async login(@Body() loginDto: LoginDto): Promise<LoginInfo> {
        const token = await this.authService.signIn(loginDto.email, loginDto.password);
        if (!token) {
            throw new UnauthorizedException(AuthErrors.INVALID_CREDENTIALS);
        }
        const user = await this.userService.findByEmail(loginDto.email);
        return new LoginInfo({...user.toObject(), token});
    }

}
