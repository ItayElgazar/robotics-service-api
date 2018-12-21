import { HttpException, Injectable, Logger, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RobotDto } from '../dto/robot.dto';
import { MissionDto } from '../dto/mission.dto';
import { MissionErrors } from '../shared/errors.enum';
import { RobotDocument } from '../schemas/robot.schema';
import { Robot } from '../robot';
import { missionsService } from './missions.service';
import { MongoError } from 'mongodb';

@Injectable()
export class RobotsService implements OnModuleInit {
    constructor(@InjectModel('Robot') private readonly robotModel: Model<RobotDocument>) {
    }

    async onModuleInit(): Promise<void> {
        Logger.log('Initialized', 'RobotService');
        // If the system shut down for some reason, taking care of the last missions and executing them again
        const isPreviousMissionsExecuted = await this.executeLastMissions().catch(err => this.handleErrors(err));
        if (isPreviousMissionsExecuted) {
            Logger.log('All previous missions executed!', 'RobotService');
        }
        this.addMockRobot();
    }

    private robots: RobotDocument[] = [];

    async createRobot(robot: RobotDto): Promise<RobotDocument> {
        const robotObject = new Robot(robot);
        const createdRobot = new this.robotModel(robotObject);
        return await createdRobot.save();
    }


    async findById(id: string): Promise<RobotDocument> {
        if (this.robots.length > 0) {
            const existingRobot = this.robots.find(r => r.id === id);
            if (existingRobot) {
                return existingRobot;
            }
        }

        const robot = await this.robotModel.findOne({ _id: id }).exec();
        this.robots.push(robot);
        return robot;
    }

    async findAll(): Promise<RobotDocument[]> {
        const robots = await this.robotModel.find().exec();
        return robots;
    }

    async deleteById(id: string) {
        return await this.robotModel.findByIdAndDelete(id);
    }

    async executeMission(missionDto: MissionDto): Promise<void> {
        const robot = await this.findById(missionDto.robotId);
        if (!robot) {
            throw new NotFoundException();
        } else if (this.isRobotBatteryLow(robot)) {
            throw new HttpException(MissionErrors.BATTERY_LOW, 400);
        }
        robot.missions = missionsService.appendMissionToQueue(robot.missions, missionDto.mission);
        await robot.save();
        if (robot.missions.length === 1) {
            robot.executeMission(missionDto.mission, robot).catch(err => this.handleErrors(err));
        }
    }

    private async executeLastMissions() {
        const robots = await this.findAll();
        const isMissionsExecuted = robots.some((robot: RobotDocument) => {
            if (robot.missions.length > 0) {
                const lastMission = robot.missions[robot.missions.length - 1];
                robot.executeMission(lastMission, robot).catch(err => this.handleErrors(err));
                return true;
            }
        });
        return isMissionsExecuted;

    }

    private isRobotBatteryLow(robot: Robot): boolean {
        return robot.batteryPercentage < 20;
    }

    private handleErrors(error: MongoError) {
        Logger.error(error.errmsg, 'MongoError');
    }

    // for test purposes, adding robot if there's not robots on db
    private async addMockRobot() {
        const robots = await this.findAll();
        if (robots.length === 0) {
            await this.createRobot({ name: 'Test Robot' });
            Logger.log('Test robot created', 'RobotServices');
        }
    }
}
