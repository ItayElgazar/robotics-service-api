import { RobotMissions } from './robot-missions.enum';
import { GuardMission } from './guard-mission';
import { PatrolMission } from './patrol-mission';
import { QuickScanMission } from './quick-scan-mission';
import { IdleMission } from './idle-mission';
import { RobotDocument } from '../schemas/robot.schema';

class MissionFactory {
    /** Mission Factory
     * I implemented this factory and the instances for every mission to allow the ability to
     * add code logic and complexity and not just change the mission as value
     * @param missions
     * @param robot
     */
    getMission(missions: RobotMissions, robot: RobotDocument) {
        switch (missions) {
            case RobotMissions.GUARD:
                return new GuardMission(robot);
            case RobotMissions.PATROL:
                return new PatrolMission(robot);
            case RobotMissions.QUICK_SCAN:
                return new QuickScanMission(robot);
            default:
                return new IdleMission(robot);
        }
    }

}

export const missionFactory = new MissionFactory();
