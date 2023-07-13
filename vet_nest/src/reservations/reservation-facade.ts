import { Injectable } from "@nestjs/common";
import { ReservationCancelationService } from "./reservation-cancelation.service";
import { PaymentsService } from "@/payments/payments.service";
import { ReservationService } from "./reservations.service";

@Injectable()
export class ReservationFacade {

    constructor(
        private readonly reservationService: ReservationService,
        private readonly reservationCancelationService: ReservationCancelationService,
        private readonly paymentService: PaymentsService
    ) {}

    cancelReservation(reservationId: number): void {
        const canceledReservation = this.reservationCancelationService.cancelReservation(reservationId);
        //TODO: Payments를 가져온다. 
        
        
    }
}