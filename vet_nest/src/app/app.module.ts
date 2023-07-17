import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
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
import { VetsService } from '../vets/vets.service';
import { JwtService } from '@nestjs/jwt';
import { ExceptionsService } from '../exceptions/exceptions.service';
import { currentModeProviders } from './providers/currentMode.provider';
import { HttpModule } from '@nestjs/axios';
import { TimeSlotReposiotory } from '../reservations/repository/timeslot-repository';
import { FakePgModule } from '@/fake-pg/fake-pg.module';

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
    PaymentsModule,
    ReservationsModule,
    DiagnosisModule,
    PetsModule,
    VetsModule,
    UsersModule,
    ExceptionsModule,
    HttpModule,
    FakePgModule,
  ],
  providers: [
    AppService,
    VetsService,
    JwtService,
    ExceptionsService,
    currentModeProviders,
    TimeSlotReposiotory,
  ],
})
export class AppModule {}
