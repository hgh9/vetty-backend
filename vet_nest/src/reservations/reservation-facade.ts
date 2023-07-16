import { Injectable } from '@nestjs/common';
import { ReservationCancelationService } from './reservation-cancelation.service';
import { PaymentsService } from '@/payments/payments.service';
import { ReservationService } from './reservations.service';
import { Reservation } from './entity/reservation.entity';

@Injectable()
export class ReservationFacade {
  constructor(
    private readonly reservationService: ReservationService,
    private readonly reservationCancelationService: ReservationCancelationService,
    private readonly paymentService: PaymentsService,
  ) {}

  async cancelReservation(reservationId: number): Promise<Reservation> {
    try {
      const canceledReservation =
        await this.reservationCancelationService.cancelReservation(reservationId);

      const canceledPayments = await 
        this.paymentService.cancelPaymentsByReservationId(canceledReservation.id);

      canceledReservation.payments = canceledPayments;
      return Promise.resolve(canceledReservation);
    } 
    catch (e) {
      throw e;
    }
  }
}
