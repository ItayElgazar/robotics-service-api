import { Body, Controller, Delete, Get, HttpCode, HttpStatus, NotFoundException, Param, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RobotsService } from './services/robots.service';
import { UserDto } from '../users/dto/user.dto';
import { RobotDto } from './dto/robot.dto';
import { MissionDto } from './dto/mission.dto';

@Controller('robots')
@UseGuards(AuthGuard('jwt'))
export class RobotsController {

    constructor(private readonly robotService: RobotsService) {}

    @Get('/:id')
    async getRobotById(@Param('id') id: string) {
       const robot = await this.robotService.findById(id);
       if (!robot) {
           return new NotFoundException();
       }
       return robot;
    }

    @Get()
    async getAllRobots() {
        return await this.robotService.findAll();
    }

    @Post()
    async createRobot(@Body(new ValidationPipe()) robot: RobotDto) {
        return await this.robotService.createRobot(robot);
    }

    @Delete('/:id')
    async deleteRobot(@Param('id') id: string) {
        return await this.robotService.deleteById(id);
    }

    @Post('/mission')
    @HttpCode(200)
    async executeMission(@Body(new ValidationPipe()) mission: MissionDto) {
        return await this.robotService.executeMission(mission);
    }
}
