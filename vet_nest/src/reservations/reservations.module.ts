import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from './entity/reservation.entity';
import { ReservationService } from './reservation.service';
import { ReservationsController } from './reservations.controller';
import { ReservationCancelationService } from './reservation-cancelation.service';
import { ReservationCancelationController } from './reservation-cancelation.controller';
import { Payment } from './entity/payment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Reservation, 
      Payment
    ])
  ],
  providers: [
    ReservationService, 
    ReservationCancelationService
  ],
  controllers: [
    ReservationsController, 
    ReservationCancelationController
  ],
  exports: [
    ReservationService, 
    ReservationCancelationService
  ]
})
export class ReservationsModule {}
