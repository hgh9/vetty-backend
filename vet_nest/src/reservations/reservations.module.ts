import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationEntity } from './entity/reservation.entity';
import { ReservationsController } from './reservations.controller';
import { ReservationCancelationService } from './reservation-cancelation.service';
import { ReservationService } from './reservation.service';
import { DatabaseModule } from '@/database/database.module';
import { reservationProvider } from './reservations';
@Module({
  imports: [
    DatabaseModule
  ],
  controllers: [
    ReservationsController
  ],
  providers: [
    ...reservationProvider,
    ReservationService, 
    ReservationCancelationService
  ]
})
export class ReservationsModule { }
