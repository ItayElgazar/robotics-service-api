export const appConfig = {
  // for envs
  mongodb: {
    name: 'roboticsDB',
    url: process.env.mongo_url ? process.env.mongo_url : 'localhost',
  },
  minutesBetweenSameMission: 10,
  missionDuration: 1, // in minutes
};

