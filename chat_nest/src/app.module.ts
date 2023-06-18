import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MessageModule } from './message-events/message.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import config from '@configs';
import * as winston from 'winston';
import {
  WinstonModule,
  utilities as nestWinstonModuleUtilities,
} from 'nest-winston';
import { DatabaseModule } from './database/database.module';
import { PhotoService } from './photo/photo.service';
import { PhotoModule } from './photo/photo.module';
import { photoProviders } from './photo/photo.provider';
import { UsersController } from './users/users.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '../.env',
      isGlobal: true,
      load: [config],
    }),
    MessageModule,
    WinstonModule.forRoot({
      transports: [
        new winston.transports.Console({
          level:
            process.env.REACT_APP_ENV_MODE === 'production' ? 'info' : 'silly',
          format: winston.format.combine(
            winston.format.timestamp(),
            nestWinstonModuleUtilities.format.nestLike('test', {
              prettyPrint: true,
            }),
          ),
        }),
      ],
    }),
    DatabaseModule,
    PhotoModule,
    UsersModule,
  ],
  controllers: [AppController, UsersController],
  providers: [...photoProviders, AppService, UsersService, PhotoService],
})
export class AppModule {}
