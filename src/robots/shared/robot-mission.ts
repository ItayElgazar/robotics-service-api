import { Robot } from '../interfaces/robot.interface';
import { RobotMissions } from './robot-missions.enum';

export abstract class RobotMission {
    protected robot: Robot;

    constructor(robot: Robot) {
        this.robot = robot;
    }

    abstract start();

    protected stop(): void {
        this.robot.robotMission = RobotMissions.IDLE;
    }
}
