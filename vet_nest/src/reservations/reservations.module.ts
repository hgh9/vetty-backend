import { Module } from '@nestjs/common';
import { ReservationCancelationController } from './reservation-cancelation.controller';
import { DatabaseModule } from '../database/database.module';
import { ConfigModule } from '@nestjs/config';
import config from '../../config/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from './entity/reservation.entity';
import { Payment } from './entity/payment.entity';
import { ReservationCancelationService } from './reservation-cancelation.service';

@Module({
  imports: [
    DatabaseModule
  ],
  controllers: [ReservationCancelationController],
  providers: [
    ReservationCancelationService
  ]
})
export class ReservationsModule {}
