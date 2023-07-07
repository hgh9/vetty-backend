import { Injectable } from '@nestjs/common';
import { PaymentsRepository } from './repository/payments.repository';

@Injectable()
export class PaymentsService {
  constructor(private readonly paymentsRepository: PaymentsRepository) {}

  async create(createPaymentDto) {
    if (!(createPaymentDto.reservationId && createPaymentDto.amount)) {
      throw new Error('invalid data');
    }

    const targetPayment =
      await this.paymentsRepository.findByPaymentId(createPaymentDto.reservationId);
    if (targetPayment && (targetPayment.status === 'progress' || targetPayment.status === 'done')) {
      throw new Error('payment has already made');
    }

    return this.paymentsRepository.createPayment(createPaymentDto.reservationId, createPaymentDto.amount);
  }

  async cancel(cancelPaymentDto) {
    if (!cancelPaymentDto.paymentId) {
      throw new Error('paymentId is required');
    }

    const targetPayment =
      await this.paymentsRepository.findByPaymentId(cancelPaymentDto.paymentId);
    if (!targetPayment || targetPayment.status !== 'progress') {
      throw new Error('payment is not in progress');
    }

    return this.paymentsRepository.cancel(cancelPaymentDto.paymentId);
  }

  async refund(refundPaymentDto) {
    if (!refundPaymentDto.paymentId) {
      throw new Error('paymentId is required');
    }

    const targetPayment =
      await this.paymentsRepository.findByPaymentId(refundPaymentDto.paymentId);
    if (!targetPayment || targetPayment.status !== 'done') {
      throw new Error('payment is not done');
    }

    return this.paymentsRepository.refund(refundPaymentDto.paymentId);
  }

  // API (X), PG 대체 내부 용도 (O)
  async done(donePaymentDto) {
    if (!donePaymentDto.paymentId) {
      throw new Error('paymentId is required');
    }

    const targetPayment =
      await this.paymentsRepository.findByPaymentId(donePaymentDto.paymentId);
    if (!targetPayment || targetPayment.status !== 'progress') {
      throw new Error('payment is not in progress');
    }

    return this.paymentsRepository.done(donePaymentDto.paymentId);
  }
}
