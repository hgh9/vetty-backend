import {
  Injectable
} from '@nestjs/common';
import {
  Reservation
} from '../reservations/entity/reservation.entity';
import ReservationCancelationValidator from './validator/reservation-cancelation.validator';
import { ReservationReposiotory } from './repository/reservation-repository';

@Injectable()
export class ReservationCancelationService {
  constructor(
    private readonly reservationRepository: ReservationReposiotory,
  ) {}

  async cancelReservation(reservationId: number): Promise<Reservation> {
    const reservation = await this.reservationRepository.getReservationById(reservationId);
    const isValid = await ReservationCancelationValidator.validate(reservation);
    if (isValid) {
      reservation.cancel();  
      this.reservationRepository.save(reservation);
    }
    return Promise.resolve(reservation);
  }
}
