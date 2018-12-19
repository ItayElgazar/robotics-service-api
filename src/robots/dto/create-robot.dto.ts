import { RobotMissions } from '../shared/robot-missions.enum';

export class CreateRobotDto {
    _id: string;
    name: string;
    latitude: number = 32.071886;
    longitude: number = 34.850953;
    batteryPercentage: number = 30;
    robotMission: RobotMissions = RobotMissions.IDLE;

    constructor(partial: Partial<CreateRobotDto>) {
        Object.assign(this, partial);
    }

}
