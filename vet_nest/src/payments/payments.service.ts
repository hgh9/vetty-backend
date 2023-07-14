import { Injectable } from '@nestjs/common';
import { PaymentsRepository } from './repository/payments.repository';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class PaymentsService {
  constructor(
    private readonly paymentsRepository: PaymentsRepository,
    private readonly httpService: HttpService,
  ) {}

  async create(createPaymentDto) {
    if (!(createPaymentDto.reservationId && createPaymentDto.amount)) {
      throw new Error('invalid data');
    }

    const targetPayment = await this.paymentsRepository.findByReservationId(
      createPaymentDto.reservationId,
    );
    if (targetPayment && targetPayment.status === 'done') {
      throw new Error('payment has already made');
    }

    const pgCreateUrl = 'http://localhost:3001/pg/create';
    const pgCreateBody = {
      reservationId: createPaymentDto.reservationId,
      amount: createPaymentDto.amount,
    };

    const pgResponse = (
      await firstValueFrom(this.httpService.post(pgCreateUrl, pgCreateBody))
    ).data;
    if (pgResponse.code !== 201) {
      throw new Error('pg error');
    }

    return this.paymentsRepository.createPayment(
      createPaymentDto.reservationId,
      createPaymentDto.amount,
      pgResponse.result.appId,
    );
  }

  async refund(refundPaymentDto) {
    if (!refundPaymentDto.paymentId) {
      throw new Error('paymentId is required');
    }

    const targetPayment = await this.paymentsRepository.findByPaymentId(
      refundPaymentDto.paymentId,
    );
    if (!targetPayment || targetPayment.status === 'refund') {
      throw new Error('payment is not refundable');
    }

    const pgRefundUrl = 'http://localhost:3001/pg/refund';
    const pgRefundBody = { appId: targetPayment.appId };
    const result = (
      await firstValueFrom(this.httpService.post(pgRefundUrl, pgRefundBody))
    ).data;
    if (result.code !== 200) {
      throw new Error('pg error');
    }

    return this.paymentsRepository.refund(refundPaymentDto.paymentId);
  }
}
