import { Repository } from "typeorm";
import { ReceptionMethod, Reservation, TreatmentStatus } from "../entity/reservation.entity";
import * as moment from "moment";

export class MockReservationRepository
{
    async getReservationById(reservationId: number): Promise<Reservation>
    {
        const ADD_HOUR = (reservationId == 2) 
            ? 0.5 
            : 1.5; 
        const RESERVATION_STATUS = (reservationId == 3) 
            ? TreatmentStatus.RESERVATION_CANCELED
            : TreatmentStatus.RESERVATION_COMPLETED;

        let reservation = new Reservation();
        reservation.id = reservationId;
        reservation.receptionMethod = ReceptionMethod.RESERVATION;
        reservation.status = RESERVATION_STATUS;
        reservation.reservedAt = moment().add(ADD_HOUR, 'hours').toDate();
        reservation.petId = '263df66a-c1e0-4ad3-94e7-bf8236ec3f09';
        reservation.vetId = 1;
        reservation.slotId = 1;
        reservation.userId = 1;
        reservation.amount = 10000;
        reservation.createdAt = new Date();
        return Promise.resolve(reservation);
    }

    async save(reservation: Reservation): Promise<Reservation> {
        return reservation;
    }
}