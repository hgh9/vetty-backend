import { Reservation } from "./entity/reservation.entity";

export interface IReservationsCancelation {
  cancelReservation(reservationId: number): Promise<Reservation>;
}
