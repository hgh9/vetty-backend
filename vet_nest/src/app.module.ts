import { Logger, Module, LoggerService } from '@nestjs/common';
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
import { DiagnosisModule } from './diagnosis/diagnosis.module';
import { DisgnosisController } from './diagnosis/diagnosis.controller';
import { DiagnosisService } from './diagnosis/diagnosis.service';
import { PetsRepository } from './pets/repository/pets.repository';
import { UsersRepository } from './users/repository/users.repository';
import { JwtService } from '@nestjs/jwt';
import { ExceptionService } from './exception/exception.service';
import { ExceptionModule } from './exception/exception.module';

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
    ExceptionModule,
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
    UsersService,
    DiagnosisService,
    UsersRepository,
    JwtService,
    ExceptionService,
  ],
})
export class AppModule {}
