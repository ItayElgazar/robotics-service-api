import { IsString } from 'class-validator';

export class RobotDto {
    @IsString()
    name: string;
}
