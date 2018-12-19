import { RobotMission } from './robot-mission';
import { Robot } from '../interfaces/robot.interface';
import { RobotMissions } from './robot-missions.enum';

export class PatrolMission extends RobotMission {
    constructor(robot: Robot) {
        super(robot);
    }

    start() {
        this.robot.robotMission = RobotMissions.PATROL;
    }

}
