import { IsDefined, IsEmail } from 'class-validator';
import { Roles } from '../../shared/permissions/roles.enum';

export class UserDto {
    @IsEmail()
    email: string;
    @IsDefined()
    password: string;
    @IsDefined()
    role: Roles;
}
