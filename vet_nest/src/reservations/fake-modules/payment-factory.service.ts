import { Injectable } from '@nestjs/common';
import { FakePaymentService } from './fake-payment.service';

@Injectable()
export class PaymentFactoryService {
    constructor(private fakePaymentService: FakePaymentService) {

    }

    getService(env: string) {
       return (env == 'test') 
        ? this.fakePaymentService 
        : this.fakePaymentService;
    }
}
