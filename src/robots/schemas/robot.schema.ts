import { Document, model, Schema, Types } from 'mongoose';
import { Robot } from '../robot';
import { ObjectID } from 'bson';

export const RobotSchema = new Schema({
    name: String,
    latitude: Number,
    longitude: Number,
    batteryPercentage: Number,
    robotMission: String,
    lastMissionExecuted: Date,
    missions: [String],
    __v: { type: Number, select: false },

});

// register each method at RobotSchema
RobotSchema.method('executeMission', Robot.prototype.executeMission);
RobotSchema.method('isMissionExecutable', Robot.prototype.isMissionExecutable);



export interface RobotDocument extends Robot, Document {}
