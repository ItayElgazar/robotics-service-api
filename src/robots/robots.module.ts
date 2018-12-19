import { Module } from '@nestjs/common';
import { RobotsController } from './robots.controller';
import { RobotsService } from './services/robots.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RobotSchema } from './schemas/robot.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Robot', schema: RobotSchema }])],
  controllers: [RobotsController],
  providers: [RobotsService],
  exports: [RobotsService],
})
export class RobotsModule {}
