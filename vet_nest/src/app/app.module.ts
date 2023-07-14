import { Logger, Module, LoggerService } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as winston from 'winston';
import {
  WinstonModule,
  utilities as nestWinstonModuleUtilities,
} from 'nest-winston';
import config from '../../config/config';
import { DatabaseModule } from '../database/database.module';
import { ReservationsModule } from '../reservations/reservations.module';
import { DiagnosisModule } from '../diagnosis/diagnosis.module';
import { PetsModule } from '../pets/pets.module';
import { VetsModule } from '../vets/vets.module';
import { PaymentsModule } from '../payments/payments.module';
import { UsersModule } from '../users/users.module';
import { ExceptionsModule } from '../exceptions/exceptions.module';
import { PetsController } from '../pets/pets.controller';
import { VetsController } from '../vets/vets.controller';
import { PaymentsController } from '../payments/payments.controller';
import { UsersController } from '../users/users.controller';
import { DisgnosisController } from '../diagnosis/diagnosis.controller';
import { PetsService } from '../pets/pets.service';
import { PetsRepository } from '../pets/repository/pets.repository';
import { VetsService } from '../vets/vets.service';
import { PaymentsService } from '../payments/payments.service';
import { UsersService } from '../users/users.service';
import { DiagnosisService } from '../diagnosis/diagnosis.service';
import { UsersRepository } from '../users/repository/users.repository';
import { JwtService } from '@nestjs/jwt';
import { ExceptionsService } from '../exceptions/exceptions.service';
import { currentModeProviders } from './providers/currentMode.provider';
import { PaymentsRepository } from '../payments/repository/payments.repository';
import { HttpModule } from '@nestjs/axios';
import { TimeSlotReposiotory } from '../reservations/repository/timeslot-repository';

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
    DiagnosisModule,
    PetsModule,
    VetsModule,
    PaymentsModule,
    UsersModule,
    ExceptionsModule,
    HttpModule,
  ],
  controllers: [
    AppController,
    PetsController,
    VetsController,
    PaymentsController,
    UsersController,
    DisgnosisController,
  ],
  providers: [
    AppService,
    PetsService,
    PetsRepository,
    VetsService,
    PaymentsService,
    PaymentsRepository,
    UsersService,
    DiagnosisService,
    UsersRepository,
    JwtService,
    ExceptionsService,
    currentModeProviders,
    TimeSlotReposiotory,
  ],
})
export class AppModule {}
