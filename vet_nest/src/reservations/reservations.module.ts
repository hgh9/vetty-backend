import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from './entity/reservation.entity';
import { ReservationService } from './reservation.service';
import { ReservationsController } from './reservations.controller';
import { ReservationCancelationService } from './reservation-cancelation.service';

@Module({
  imports: [TypeOrmModule.forFeature([Reservation])],
  providers: [ReservationService, ReservationCancelationService],
  controllers: [ReservationsController],
})
export class ReservationsModule {}
