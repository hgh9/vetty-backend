import { Injectable } from "@nestjs/common";
import { ReservationCancelationService } from "./reservation-cancelation.service";
import { PaymentsService } from "@/payments/payments.service";

@Injectable()
export class ReservationFacade {

    constructor(
        private readonly reservationCancelationService: ReservationCancelationService,
        private readonly paymentService: PaymentsService
    ) {}

    cancelReservation(reservationId: number): void {
        const canceledReservation = this.reservationCancelationService.cancelReservation(reservationId);
        // this.paymentService
    }
}