import { RobotMission } from './robot-mission';
import { RobotDocument } from '../schemas/robot.schema';
import { Logger } from '@nestjs/common';
import { appConfig } from '../../config';

export class QuickScanMission extends RobotMission {

    constructor(robot: RobotDocument) {
        super(robot);
    }

    start() {
        setTimeout(() => {
            Logger.log(`Mission is finished for robot: ${this.robot.id}`, 'QuickScan');
            this.stop();
        }, appConfig.missionDuration * 60000);
    }

}
