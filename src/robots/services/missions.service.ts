import { RobotMissions } from '../shared/robot-missions.enum';
import { Robot } from '../robot';

class MissionsService {

    appendMissionToQueue(missions: RobotMissions[], mission: RobotMissions): RobotMissions[] {
        missions.unshift(mission);
        return missions;
    }

    getNextMission(missions: RobotMissions[]): RobotMissions {
        return missions[missions.length - 1];
    }

    removeMissionFromQueue(missions: RobotMissions[]): RobotMissions[] {
        missions.pop();
        return missions;
    }

    isMissionsLeft(missions: RobotMissions[]): boolean {
        return missions.length > 0;
    }
}

export const missionsService = new MissionsService();
