import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as winston from 'winston';
import {
  WinstonModule,
  utilities as nestWinstonModuleUtilities,
} from 'nest-winston';
import { ReservationsModule } from './reservations/reservations.module';
import config from '../config/config';
import { DatabaseModule } from './database/database.module';
import { PetsController } from './pets/pets.controller';
import { PetsService } from './pets/pets.service';
import { PetsModule } from './pets/pets.module';
import { VetsController } from './vets/vets.controller';
import { VetsService } from './vets/vets.service';
import { VetsModule } from './vets/vets.module';
import { PaymentsController } from './payments/payments.controller';
import { PaymentsService } from './payments/payments.service';
import { PaymentsModule } from './payments/payments.module';
import { UsersModule } from './users/users.module';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { CheckModule } from './check/check.module';
import { PetsRepository } from './pets/repository/pets.repository';
import { UsersRepository } from './users/repository/users.repository';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '../.env',
      isGlobal: true,
      load: [config],
    }),
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
    ReservationsModule,
    CheckModule,
    PetsModule,
    VetsModule,
    PaymentsModule,
    UsersModule,
  ],
  controllers: [
    AppController,
    PetsController,
    VetsController,
    PaymentsController,
    UsersController,
  ],
  providers: [
    AppService,
    PetsService,
    PetsRepository,
    VetsService,
    PaymentsService,
    UsersService,
    UsersRepository,
    JwtService,
  ],
})
export class AppModule {}
