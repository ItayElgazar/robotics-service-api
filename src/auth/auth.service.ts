import { JwtService } from '@nestjs/jwt';
import { ClassSerializerInterceptor, Injectable, UnauthorizedException, UseInterceptors } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from '../users/user';
import { BcryptService } from '../shared/bcrypt/bcrypt.service';
import { JwtPayload } from './interface/jwt-payload.interface';
import { Roles } from '../shared/permissions/roles.enum';

@Injectable()
@UseInterceptors(ClassSerializerInterceptor)
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly bcryptService: BcryptService,
        private readonly jwtService: JwtService,
    ) {
    }

    /** returns user token */
    async signIn(email: string, password: any): Promise<string> {
        // In the real-world app you shouldn't expose this method publicly
        // instead, return a token once you verify user credentials
        const user = await this.validate(email);

        if (!user) {
            return null;
        } else if (this.bcryptService.compare(password, user.password)) {
            const token = await this.createToken(email);
            return token;
        }
    }

    async createToken(email: string) {
        return await this.jwtService.sign({ email },  { expiresIn: 86400 });
    }

    async validate(email: string): Promise<User> {
        return await this.usersService.findByEmail(email);
    }

    async getJwtPayload(token: string): Promise<JwtPayload> {
        const payload = await this.jwtService.verify(token);

        if (!payload) {
            return null;
        }

        return payload;
    }

    async isAuthenticated(token: string): Promise<boolean> {
        return !!await this.jwtService.verify(token);
    }


    async requireRole(desiredRole: Roles, token: string): Promise<any> {
        const payload = await this.getJwtPayload(token);
        const userRole = await this.getRoleByEmail(payload.email);

        if (desiredRole !== userRole || !userRole) {
            throw new UnauthorizedException(`You don't have permission to do this action`);
        }
    }

    private async getRoleByEmail(email: string): Promise<Roles> {
        const user = await this.usersService.findByEmail(email);
        return user.role;
    }

}
