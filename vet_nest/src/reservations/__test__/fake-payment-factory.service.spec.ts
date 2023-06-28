import { Test, TestingModule } from '@nestjs/testing';
import { FakePaymentService } from '../fake-modules/fake-payment.service';

describe('PaymentFactoryService', () => {
  let service: FakePaymentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FakePaymentService],
    }).compile();

    service = module.get<FakePaymentService>(FakePaymentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
