import { Repository } from 'typeorm';
import {
  ReceptionMethod,
  Reservation,
  TreatmentStatus,
} from '../entity/reservation.entity';
import * as moment from 'moment';

export class MockReservationRepository {
  mockReservations: Reservation[] = [];
  constructor() {
    this.initialize();
  }
  async getReservationById(reservationId: number): Promise<Reservation> {
    const reservation = this.mockReservations.find((model) => {
      return model.id == reservationId;
    });
    return reservation;
  }

  getReservationsByUser(
    userId: number,
    startDate?: string,
    endDate?: string,
  ): Promise<Reservation[]> {
    const reservations = this.mockReservations.filter((model) => {
      return model.userId == userId;
    });

    if (startDate && endDate) {
      reservations.filter((model) => {
        model.reservedAt >= new Date(startDate) &&
          model.reservedAt <= new Date(endDate);
      });
    }

    return Promise.resolve(reservations);
  }

  async save(reservation: Reservation): Promise<Reservation> {
    return reservation;
  }

  private initialize(): void {
    this.mockReservations.push(this.makeReservationEntity(1));
    this.mockReservations.push(this.makeReservationEntity(2));
    this.mockReservations.push(this.makeReservationEntity(3));
  }

  private makeReservationEntity(reservationId) {
    const ADD_HOUR = reservationId == 2 ? 0.5 : 1.5;
    const RESERVATION_STATUS =
      reservationId == 3
        ? TreatmentStatus.RESERVATION_CANCELED
        : TreatmentStatus.RESERVATION_COMPLETED;

    const reservation = new Reservation();
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
    return reservation;
  }
}
