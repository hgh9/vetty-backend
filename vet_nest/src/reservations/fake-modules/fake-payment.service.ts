import { Injectable } from '@nestjs/common';
import { IPaymentService } from './payment-service.interface';

@Injectable()
export class FakePaymentService implements IPaymentService {

    constructor() {

    }

    async cancelPayment(appUuid: string): Promise<boolean> {
        return Promise.resolve(true);
    }
}
