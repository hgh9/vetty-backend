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
        await this.reservationCancelationService.cancelReservation(
          reservationId,
        );
      
      const payments = await this.reservationService.getPaymentsByReservationId(
        canceledReservation.id,
      );

      // 1:N - 예약금, 진료비 ( 예약 상태일 경우에는 무조건 1개 이지 않을까? )
      const cancelPaymentResults = await payments.map(
        async (payment) => await this.paymentService.cancelPayment(payment),
      );

      //모든 값이 예약 취소면 ? 뭘 해야하나
      //1. transaction.commit
      //2. 취소된 예약 정보 return;
      // const allPaymentCanceled = await cancelPaymentResults.every((payment) => {
      //     return (await payment).isCanceled();
      // });

      // if (!allPaymentCanceled) {

      // }
      return Promise.resolve(canceledReservation);
    } 
    catch (e) {
      throw e;
    }
  }
}
