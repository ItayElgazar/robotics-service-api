import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RobotDto } from '../dto/robot.dto';
import { CreateRobotDto } from '../dto/create-robot.dto';
import { Robot } from '../interfaces/robot.interface';
import { missionFactory } from '../shared/mission.factory';
import { RobotMissions } from '../shared/robot-missions.enum';
import { MissionDto } from '../dto/mission.dto';
import { MissionErrors } from '../shared/errors.enum';
import { appConfig } from '../../config';

@Injectable()
export class RobotsService {
    constructor(@InjectModel('Robot') private readonly robotModel: Model<Robot>) {
    }

    async createRobot(robot: RobotDto): Promise<Robot> {
        const robotObject = new CreateRobotDto(robot);
        const createdRobot = new this.robotModel(robotObject);
        return await createdRobot.save();
    }


    async findById(id: string): Promise<Robot> {
        return await this.robotModel.findOne({ _id: id }).exec();
    }

    async findAll(): Promise<Robot[]> {
        const robots = await this.robotModel.find().exec();
        return robots.map(u => u.toObject());
    }

    async deleteById(id: string) {
        return await this.robotModel.findByIdAndDelete(id);
    }

    async executeMission(missionDto: MissionDto): Promise<Robot> {
        const robot = await this.findById(missionDto.robotId);
        if (!robot) {
            throw new NotFoundException();
        } else if (this.isRobotBatteryLow(robot)) {
            throw new HttpException(MissionErrors.BATTERY_LOW, 400);
        } else if (!this.isMissionExecutable(robot, missionDto.mission)) {
            throw new HttpException(MissionErrors.WAIT_10_MINUTES, 400);
        }
        const mission = missionFactory.getMission(missionDto.mission, robot);
        mission.start();
        robot.lastMissionExecuted = new Date();
        await robot.save();
        return robot;

    }

    private isRobotBatteryLow(robot: Robot): boolean {
        return robot.batteryPercentage < 20;
    }

    private isMissionExecutable(robot: Robot, selectedMission: RobotMissions): boolean {
        const MINIMUM_DIFF = appConfig.minutesBetweenMissions * 60000;
        const timeDiff = new Date().getTime() - robot.lastMissionExecuted.getTime();
        return !(robot.lastMissionExecuted && robot.robotMission === selectedMission && timeDiff < MINIMUM_DIFF);
    }
}
