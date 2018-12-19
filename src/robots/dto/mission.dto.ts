import { IsDefined, IsString } from 'class-validator';
import { RobotMissions } from '../shared/robot-missions.enum';

export class MissionDto {
    @IsDefined()
    mission: RobotMissions;
    @IsString()
    robotId: string;
}
