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

@Injectable()
// -> ReservationCancelationRepositoryService
export class ReservationCancelationService implements IReservationsCancelation {
  //TODO: Repository<Reservation> ->customReservationRepository 
  private reservationRepository: Repository<Reservation>;
  //TODO: paymentService -> paymentApiCaller
  // private paymentRepository: Repository<Payment>;
  // private paymentService: IPaymentService;
  constructor(
    @Inject('DATA_SOURCE')
    private readonly dataSource: DataSource,
    private readonly paymentFactory: PaymentFactoryService,
  ) {
    this.reservationRepository = this.dataSource.getRepository(Reservation);
    // this.paymentRepository = this.dataSource.getRepository(Payment);
    // this.paymentService = this.paymentFactory.getService('test');
  }

  async cancelReservation(reservationId: number): Promise<Reservation> {
    const reservation = await this.reservationRepository.findOneBy({ id: reservationId });
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
