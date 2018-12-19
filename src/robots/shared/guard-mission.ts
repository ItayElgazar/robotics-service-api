import { RobotMission } from './robot-mission';
import { RobotMissions } from './robot-missions.enum';
import { Robot } from '../interfaces/robot.interface';

export class GuardMission extends RobotMission {

    constructor(robot: Robot) {
        super(robot);
    }

    start() {
        this.robot.robotMission = RobotMissions.GUARD;
    }

}
