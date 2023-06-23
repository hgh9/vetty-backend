export interface IReservationsCancelation {
  cancelReservation(reservationId: number): Promise<boolean>;
}
