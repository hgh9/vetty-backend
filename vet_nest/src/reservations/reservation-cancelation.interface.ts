import { Reservation } from "./entity/reservation.entity";

export interface IReservationsCancelation {
  cancelReservation(reservationId: number): Promise<boolean>;
  getTargetReservation(reservationId: number): Promise<Reservation>;
}
