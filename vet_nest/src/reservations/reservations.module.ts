import { Module } from '@nestjs/common';
import { ReservationCancelationController } from './reservation-cancelation.controller';
import { DatabaseModule } from '../database/database.module';
import { ReservationCancelationService } from './reservation-cancelation.service';
import { FakePaymentService } from './fake-modules/fake-payment.service';
import { PaymentFactoryService } from './fake-modules/payment-factory.service';

@Module({
  imports: [
    DatabaseModule
  ],
  controllers: [ReservationCancelationController],
  providers: [
    ReservationCancelationService,
    PaymentFactoryService,
    FakePaymentService
  ]
})
export class ReservationsModule {}
