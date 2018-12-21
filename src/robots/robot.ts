import { RobotMissions } from './shared/robot-missions.enum';
import { missionFactory } from './shared/mission.factory';
import { Logger } from '@nestjs/common';
import { appConfig } from '../config';
import { RobotDocument } from './schemas/robot.schema';

export class Robot {
    name: string;
    latitude: number = 32.071886;
    longitude: number = 34.850953;
    batteryPercentage: number = 30;
    robotMission: RobotMissions;
    lastMissionExecuted: Date;
    missions: RobotMissions[];

    constructor(data: Partial<Robot>) {
        Object.assign(this, data);
    }

    async executeMission(robotMission: RobotMissions, robotDocument: RobotDocument) {
        const mission = missionFactory.getMission(robotMission, robotDocument);
        Logger.log(`First mission started for robot: ${robotDocument.id}`, robotMission);
        this.lastMissionExecuted = new Date();
        this.robotMission = robotMission;
        await robotDocument.save();
        mission.start();
    }

    isMissionExecutable(selectedMission: RobotMissions): boolean {
        if (!this.lastMissionExecuted) {
            return true;
        }
        const MINIMUM_DIFF = appConfig.minutesBetweenSameMission * 60000;
        const timeDiff = new Date().getTime() - this.lastMissionExecuted.getTime();
        return !(this.lastMissionExecuted && this.robotMission === selectedMission && timeDiff < MINIMUM_DIFF);
    }
}
