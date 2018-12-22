import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { RobotsModule } from './robots/robots.module';
import { appConfig } from './config';

@Module({
  imports: [UsersModule, MongooseModule.forRoot(`mongodb://${appConfig.mongodb.url}/${appConfig.mongodb.name}`), AuthModule, RobotsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

