import { RobotMission } from './robot-mission';
import { RobotMissions } from './robot-missions.enum';
import { RobotDocument } from '../schemas/robot.schema';
import { Logger } from '@nestjs/common';
import { appConfig } from '../../config';

export class GuardMission extends RobotMission {

    constructor(robot: RobotDocument) {
        super(robot);
    }

    start() {
        setTimeout(() => {
            Logger.log(`Mission is finished for robot: ${this.robot.id}`, 'Guard');
            this.stop();
        }, appConfig.missionDuration * 60000);
    }

}
