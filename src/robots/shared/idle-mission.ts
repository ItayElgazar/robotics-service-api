import { RobotMission } from './robot-mission';
import { RobotMissions } from './robot-missions.enum';
import { RobotDocument } from '../schemas/robot.schema';

export class IdleMission extends RobotMission {

    constructor(robot: RobotDocument) {
        super(robot);
    }

    start() {
        this.robot.robotMission = RobotMissions.IDLE;
    }

}
