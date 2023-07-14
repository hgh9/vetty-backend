import { Injectable } from '@nestjs/common';

@Injectable()
export class PaymentsRepositoryMock
{
  createPayment() {
    return {
      reservationId: 1,
      paymentId: 1,
      amount: 200,
      status: 'progress',
    };
  }
  
  cancel(paymentId) {
    return {
      paymentId: 2,
      amount: 200,
      status: 'canceled',
    };
  }
  
  refund() {
    return {
      paymentId: 3,
      amount: 200,
      status: 'refund',
    };
  }
  
  findByPaymentId(paymentId) {
    if (paymentId === 1) {
      return null;
    }
    if (paymentId === 2) {
      return {
        paymentId: 2,
        status: 'progress',
      };
    }
    if (paymentId === 3) {
      return {
        paymentId: 3,
        status: 'done',
      };
    }
  }
}
