# Robotics Manager Api

##### What's inside:
- JWT Authentication (I choosed JWT cause it's simpler to use, it can be used across all services, and more...)
- The option to manage robot (add, delete and get) robots
- The option to execute a robot's mission for each robot with a queue list by order
- I comment where it's necessary. In general I don't like to use comments for everything I do. 
clear code should be readable :) 

#### How to run:
- run ```npm install```
- and then ```npm run start``` or ```npm run start:dev``` (for nodemon)
- dependencies:
  - You need to have MongoDB service runing on your machine
  
#### Runing through docker:
    docker build -t robotics-api-service
    docker-compose up
   
##### Whats left to be done:
- Testing
- Fixing the docker image
- Thinking about edge cases
