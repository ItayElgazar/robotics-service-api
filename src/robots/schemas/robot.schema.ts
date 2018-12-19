
import * as mongoose from 'mongoose';

export const RobotSchema = new mongoose.Schema({
    name: String,
    latitude: Number,
    longitude: Number,
    batteryPercentage: Number,
    robotMission: String,
    lastMissionExecuted: Date,
    __v: { type: Number, select: false},
});
