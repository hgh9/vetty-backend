import { Test, TestingModule } from '@nestjs/testing';
import { PaymentsService } from '../payments.service';
import { PaymentsRepositoryMock } from '../repository/payments.repository.mock';
import { PaymentsRepository } from '../repository/payments.repository';

describe('CREATE PAYMENT', () => {
  let service: PaymentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: PaymentsRepository,
          useClass: PaymentsRepositoryMock,
        },
        PaymentsService,
      ],
    }).compile();

    service = module.get<PaymentsService>(PaymentsService);
  });
  
  test('invalid data fails', async () => {
    const createPaymentDto = {
      reservationId: null,
      amount: 100,
    };
    
    try {
      await service.create(createPaymentDto);
    }
    catch(error) {
      expect(error).toBeInstanceOf(Error);
    }
    
    expect.assertions(1);
  });
  
  test('duplicate payment fails', async () => {
    const createPaymentDto = {
      reservationId: 2,
      amount: 50,
    };
    
    try {
      await service.create(createPaymentDto);
    }
    catch(error) {
      expect(error).toBeInstanceOf(Error);
    }
    
    expect.assertions(1);
  });
  
  test('create passes with valid payment data', async () => {
    const createPaymentDto = {
      reservationId: 1,
      amount: 200,
    };
    const createdPayment = {
      reservationId: 1,
      paymentId: 1,
      amount: 200,
      status: 'progress',
    };
    
    const result = await service.create(createPaymentDto);
    
    expect(result).toEqual(createdPayment);
  });
});

describe('CANCEL PAYMENT', () => {
  let service: PaymentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: PaymentsRepository,
          useClass: PaymentsRepositoryMock,
        },
        PaymentsService,
      ],
    }).compile();

    service = module.get<PaymentsService>(PaymentsService);
  });
  
  test('cancel fails when paymentId is missing', async () => {
    const cancelPaymentDto = { paymentId: null };
    
    try {
      await service.cancel(cancelPaymentDto);
    }
    catch(error) {
      expect(error).toBeInstanceOf(Error);
    }
    
    expect.assertions(1);
  });
  
  test('cancel fails when paymentId is not in progress', async () => {
    const cancelPaymentDto = { paymentId: 3 };

    try {
      await service.cancel(cancelPaymentDto);
    }
    catch(error) {
      expect(error).toBeInstanceOf(Error);
    }

    expect.assertions(1);
  });
  
  test('cancel passes with valid data', async () => {
    const cancelPaymentDto = { paymentId: 2 };
    const canceled = {
      paymentId: 2,
      amount: 200,
      status: 'canceled',
    };

    const result = await service.cancel(cancelPaymentDto);
    
    expect(result).toEqual(canceled);
  });
});

describe('CANCEL PAYMENT', () => {
  let service: PaymentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: PaymentsRepository,
          useClass: PaymentsRepositoryMock,
        },
        PaymentsService,
      ],
    }).compile();

    service = module.get<PaymentsService>(PaymentsService);
  });
  
  test('refund fails when paymentId is missing', async () => {
    const cancelPaymentDto = { paymentId: null };

    try {
      await service.refund(cancelPaymentDto);
    }
    catch(error) {
      expect(error).toBeInstanceOf(Error);
    }

    expect.assertions(1);
  });
  
  test('refund fails when payment is not done', async () => {
    const cancelPaymentDto = { paymentId: 2 };

    try {
      await service.refund(cancelPaymentDto);
    }
    catch(error) {
      expect(error).toBeInstanceOf(Error);
    }

    expect.assertions(1);
  });

  test('refund passes with valid data', async () => {
    const refundPaymentDto = { paymentId: 3 };
    const refunded = {
      paymentId: 3,
      amount: 200,
      status: 'refund',
    };

    const result = await service.refund(refundPaymentDto);

    expect(result).toEqual(refunded);
  });
});
