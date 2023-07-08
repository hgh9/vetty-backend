import { Module } from '@nestjs/common';
import { DatabaseModule } from '@/database/database.module';
import { ReservationCancelationController } from '@/reservations/reservation-cancelation.controller';
import { ReservationCancelationService } from '@/reservations/reservation-cancelation.service';
import { ReservationReposiotory } from '@/reservations/repository/reservation-repository';
import { ReservationService } from './reservations.service';
import { ReservationsController } from './reservations.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [
    ReservationCancelationController,
    ReservationsController,
  ],
  providers: [
    ReservationCancelationService,
    ReservationReposiotory,
    ReservationService
    // PaymentFactoryService,
    // FakePaymentService,
  ],
})
export class ReservationsModule {}
