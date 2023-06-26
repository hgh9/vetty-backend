import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MessageModule } from './message-events/message.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import * as winston from 'winston';
import {
  WinstonModule,
  utilities as nestWinstonModuleUtilities,
} from 'nest-winston';
import { PhotoModule } from './photos/photos.module';
import { UsersController } from './users/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationsModule } from './reservations/reservations.module';
import config from '../config/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '../.env',
      isGlobal: true,
      load: [config],
    }),
    MessageModule,
    // PrometheusModule.register({
    //   pushgateway: {
    //     url: 'http://127.0.0.1:9091',
    //   },
    // }),
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
    TypeOrmModule.forRoot(config().databaseConfig),
    // DatabaseModule,
    PhotoModule,
    UsersModule,
    ReservationsModule,
  ],
  controllers: [AppController, UsersController],
  providers: [AppService, UsersService],
})
export class AppModule {}
