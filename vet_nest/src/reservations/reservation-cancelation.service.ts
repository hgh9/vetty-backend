import {
  Inject,
  Injectable
} from '@nestjs/common';
import {
  Reservation
} from '../reservations/entity/reservation.entity';
import { IReservationsCancelation } from './reservation-cancelation.interface';
import { DataSource, Repository } from 'typeorm';
import { Payment } from './entity/payment.entity';
import * as moment from 'moment';
import { PaymentFactoryService } from './fake-modules/payment-factory.service';
import { IPaymentService } from './fake-modules/payment-service.interface';
import ReservationCancelationValidator from './validator/reservation-cancelation.validator';

@Injectable()
// -> ReservationCancelationRepositoryService
export class ReservationCancelationService implements IReservationsCancelation {
  private reservationRepository: Repository<Reservation>;
  private paymentRepository: Repository<Payment>;
  private paymentService: IPaymentService;
  constructor(
    @Inject('DATA_SOURCE')
    private readonly dataSource: DataSource,
    private readonly paymentFactory: PaymentFactoryService,
  ) {
    this.reservationRepository = this.dataSource.getRepository(Reservation);
    this.paymentRepository = this.dataSource.getRepository(Payment);
    this.paymentService = this.paymentFactory.getService('test');
  }

  async cancelReservation(reservationId: number): Promise<boolean> {
    const reservation = await this.getTargetReservation(reservationId);
    try {
      const isValid = await ReservationCancelationValidator.validate(reservation);
      if (!isValid) {
        Promise.reject(false);
      }
      reservation.cancel();
      this.reservationRepository.save(reservation);
      return Promise.resolve(true);
    }
    catch(e) {
      throw e;
    }
  }

  public async getTargetReservation(id: number): Promise<Reservation> {
    const reservations = await this.reservationRepository.findOneBy({ id: id });
    return reservations;
  }
}
