import { Module } from '@nestjs/common';
import { DatabaseModule } from '@/database/database.module';
import { ReservationCancelationController } from '@/reservations/reservation-cancelation.controller';
import { ReservationCancelationService } from '@/reservations/reservation-cancelation.service';
import { ReservationReposiotory } from '@/reservations/repository/reservation-repository';
import { ReservationService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { ReservationFacade } from './reservation-facade';
import { PaymentsModule } from '@/payments/payments.module';
import { PaymentsService } from '@/payments/payments.service';
import { PaymentsRepository } from '@/payments/repository/payments.repository';
import { PgApiCaller } from '@/payments/pg-api-caller';

@Module({
  imports: [DatabaseModule],
  controllers: [ReservationCancelationController, ReservationsController],
  providers: [
    ReservationCancelationService,
    ReservationReposiotory,
    ReservationService,
    ReservationFacade,
    PaymentsService,
    PaymentsRepository,
    PgApiCaller
  ],
})
export class ReservationsModule {}
