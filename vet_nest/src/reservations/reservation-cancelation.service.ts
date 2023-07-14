import {
  Inject,
  Injectable
} from '@nestjs/common';
import {
  Reservation
} from '../reservations/entity/reservation.entity';
import { IReservationsCancelation } from './reservation-cancelation.interface';
import { DataSource, Repository } from 'typeorm';
// import { Payment } from './entity/payment.entity';
import { PaymentFactoryService } from './fake-modules/payment-factory.service';
// import { IPaymentService } from './fake-modules/payment-service.interface';
import ReservationCancelationValidator from './validator/reservation-cancelation.validator';
import { ReservationReposiotory } from './repository/reservation-repository';

@Injectable()
// -> ReservationCancelationRepositoryService
export class ReservationCancelationService implements IReservationsCancelation {
  constructor(
    private readonly reservationRepository: ReservationReposiotory,
  ) {}

  async cancelReservation(reservationId: number): Promise<Reservation> {
    const reservation = await this.reservationRepository.getReservationById(reservationId);
    try {
      const isValid = await ReservationCancelationValidator.validate(reservation);
      if (isValid) {
        reservation.cancel();  
        this.reservationRepository.save(reservation);
      }
      return Promise.resolve(reservation);
    }
    catch(e) {
      //TODO: CommonResponse class 생성 후 감싸서 보낼 것
      throw e;
    }
  }
}
