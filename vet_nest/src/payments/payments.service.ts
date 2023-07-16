import { Injectable } from '@nestjs/common';
import { PaymentsRepository } from './repository/payments.repository';
import { Payment, PaymentStatus } from './entity/payments.entity';
import { IPaymentService } from './payments-service.interface';
import { PgApiCaller } from './pg-api-caller';
import { BusinessException } from 'util/exception.util';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Injectable()
export class PaymentsService implements IPaymentService {
  
  constructor(
    private readonly paymentsRepository: PaymentsRepository,
    private readonly pgApiCaller: PgApiCaller
  ) {}

  async create(dto: CreatePaymentDto) {
    
    if (!(dto.reservationId && dto.amount)) {
      throw new Error('invalid data');
    }

    const targetPayment = await this.paymentsRepository.findByReservationId(
      dto.reservationId,
    );
    if (targetPayment && targetPayment.status === PaymentStatus.COMPLETE) {
      throw new Error('payment has already made');
    }
  }
  
  getPaymentsByReservationId = async(reservationId: number): Promise<Payment[]>  => 
    this.paymentsRepository.findBy({
      reservationId: reservationId
    });
  
  cancelPayment = async(paymentId: number): Promise<Payment> => {
    
    const payment = await this.paymentsRepository.findOneBy({paymentId: paymentId});
    const pgResult = await this.pgApiCaller.cancelPayment(payment.appId);
    if (pgResult.resultCode != 'OK') {
      throw new BusinessException(pgResult, 'PG-ERROR', '500');
    }
    payment.cancel(); 
    this.paymentsRepository.save(payment);
    return Promise.resolve(payment);
  }

  cancelPayments = async(paymentIds: number[]): Promise<Payment[]> => {
    
    const canceledPayments = await Promise.all(
      paymentIds.map(async (paymentId) => 
        await this.cancelPayment(paymentId)));

    if (!canceledPayments.every((payment) => payment.isCanceled())) {
      throw new BusinessException(canceledPayments, 'PG 결제 오류', '500');
    }

    return canceledPayments;
  }

  cancelPaymentsByReservationId = async(reservationId: number): Promise<Payment[]> => {
    
    const paymentIds = (await 
      this.getPaymentsByReservationId(reservationId))
      .map((payment) => payment.paymentId);
    
    const canceledPayments = await this.cancelPayments(paymentIds);
    return canceledPayments;
  }
}
