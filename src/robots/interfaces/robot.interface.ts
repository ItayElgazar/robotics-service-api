import { Document } from 'mongoose';
import { RobotMissions } from '../shared/robot-missions.enum';

export interface Robot extends Document {
    _id: string;
    name: string;
    latitude: number;
    longitude: number;
    batteryPercentage: number;
    robotMission: RobotMissions;
    lastMissionExecuted: Date;

}
