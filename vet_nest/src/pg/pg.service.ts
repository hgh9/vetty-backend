import { Injectable } from '@nestjs/common';

@Injectable()
export class PgService {
  createPayment(createPaymentDto) {
    const { amount, reservationId } = createPaymentDto;
    if (!amount || !reservationId) {
      throw new Error('invalid data');
    }
    
    return { appId: 'PG' + reservationId };
  }
  
  refundPayment(refundPaymentDto) {
    const { appId } = refundPaymentDto;
    if (!appId) {
      throw new Error('invalid appId');
    }

    return true;
  }
}
