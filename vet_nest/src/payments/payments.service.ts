import { Injectable } from '@nestjs/common';
import { PaymentsRepository } from './repository/payments.repository';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { Payment, PaymentStatus } from './entity/payments.entity';
import { IPaymentService } from './payments-service.interface';
import { PgApiCaller } from './pg-api-caller';
import { BusinessException } from 'util/exception.util';

@Injectable()
export class PaymentsService implements IPaymentService {
  
  constructor(
    private readonly paymentsRepository: PaymentsRepository,
    // private readonly httpService: HttpService,
    private readonly pgApiCaller: PgApiCaller
  ) {}
  
  pay(createPaymentDto: object): Promise<Payment> {
    throw new Error('Method not implemented.');
  }
  cancelPayment(paymentId: number): Promise<Payment> {
    throw new Error('Method not implemented.');
  }

  async getPaymentsByReservationId(reservationId: number): Promise<Payment[]> {
    return this.paymentsRepository.findBy({
      reservationId: reservationId
    });
  }

  async cancelPaymentsByReservationId(reservationId: number): Promise<Payment[]> {
    console.log(`paymentsService.cancelPaymentsByReservationId: ${reservationId}`);
    const payments = await this.getPaymentsByReservationId(reservationId);
    const canceledPayments = payments.map((payment: Payment) => {
      payment.cancel();
      const result = this.pgApiCaller.cancelPayment(payment.appId);
      return payment;
    });

    if (!canceledPayments.every((payment) => payment.isCanceled()))
      throw new BusinessException(canceledPayments, 'PG 결제 오류', '500');

    this.paymentsRepository.save(canceledPayments);
    return canceledPayments;
  }

  

  async create(createPaymentDto) {
    if (!(createPaymentDto.reservationId && createPaymentDto.amount)) {
      throw new Error('invalid data');
    }

    const targetPayment = await this.paymentsRepository.findByReservationId(
      createPaymentDto.reservationId,
    );
    if (targetPayment && targetPayment.status === PaymentStatus.COMPLETE) {
      throw new Error('payment has already made');
    }

    const pgCreateUrl = 'http://localhost:3001/pg/create';
    const pgCreateBody = {
      reservationId: createPaymentDto.reservationId,
      amount: createPaymentDto.amount,
    };

    // const pgResponse = (
    //   await firstValueFrom(this.httpService.post(pgCreateUrl, pgCreateBody))
    // ).data;
    // if (pgResponse.code !== 201) {
    //   throw new Error('pg error');
    // }

    // return this.paymentsRepository.createPayment(
    //   createPaymentDto.reservationId,
    //   createPaymentDto.amount,
    //   pgResponse.result.appId,
    // );
  }

  // async refund(refundPaymentDto) {
  //   if (!refundPaymentDto.paymentId) {
  //     throw new Error('paymentId is required');
  //   }

  //   const targetPayment = await this.paymentsRepository.findByPaymentId(
  //     refundPaymentDto.paymentId,
  //   );
  //   if (!targetPayment || targetPayment.status === 'refund') {
  //     throw new Error('payment is not refundable');
  //   }

  //   const pgRefundUrl = 'http://localhost:3001/pg/refund';
  //   const pgRefundBody = { appId: targetPayment.appId };
  //   const result = (
  //     await firstValueFrom(this.httpService.post(pgRefundUrl, pgRefundBody))
  //   ).data;
  //   if (result.code !== 200) {
  //     throw new Error('pg error');
  //   }

  //   return this.paymentsRepository.refund(refundPaymentDto.paymentId);
  // }

  // async cancelPayment(payment: Payment): Promise<Payment> {
  //   throw new Error("Method not implemented.");
  // }
}
