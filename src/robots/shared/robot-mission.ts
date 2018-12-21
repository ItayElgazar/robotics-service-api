import { RobotDocument } from '../schemas/robot.schema';
import { RobotMissions } from './robot-missions.enum';
import { missionFactory } from './mission.factory';
import { Logger } from '@nestjs/common';
import { missionsService } from '../services/missions.service';

export abstract class RobotMission {
    protected robot: RobotDocument;

    constructor(robot: RobotDocument) {
        this.robot = robot;
    }

    abstract start();

    protected async stop(): Promise<void> {
        this.robot.missions = missionsService.removeMissionFromQueue(this.robot.missions);
        const nextJob = missionsService.getNextMission(this.robot.missions);
        if (!this.robot.isMissionExecutable(nextJob)) {
            Logger.log(`Mission is not executable for robot ${this.robot.id} +
            - you have to wait 10 minutes before executing the same mission`, 'RobotMissions');
            this.robot.missions = missionsService.removeMissionFromQueue(this.robot.missions);
        }
        await this.robot.save();
        if (missionsService.getNextMission(this.robot.missions)) {
            Logger.log(`Starting new mission: ${nextJob} for robot: ${this.robot.id}`, 'RobotMissions');
            missionFactory.getMission(nextJob, this.robot).start();
            this.robot.lastMissionExecuted = new Date();
            await this.robot.save();
        } else {
            Logger.log('All missions done', 'RobotMissions');
            this.robot.robotMission = RobotMissions.IDLE;
            this.robot.save();
        }
    }
}
