import { Test, TestingModule } from '@nestjs/testing';
import { PgService } from '../pg.service';

describe('createPayment', () => {
  let service: PgService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PgService],
    }).compile();

    service = module.get<PgService>(PgService);
  });
  
  test('createPayment passes with valid data', () => {
    const createPaymentDto = {
      amount: 100,
      reservationId: 1,
    };
    const createdPayment = {
      appId: 'PG' + createPaymentDto.reservationId,
    };
    
    const result = service.createPayment(createPaymentDto);
    
    expect(result).toEqual(createdPayment);
  });
  
  test('createPayment fails when amount is empty', () => {
    const createPaymentDto = {
      amount: null,
      reservationId: 1,
    };
    
    try {
      service.createPayment(createPaymentDto);
    }
    catch(error) {
      expect(error).toBeInstanceOf(Error);
    }
    
    expect.assertions(1);
  });
});

describe('refundPayment', () => {
  let service: PgService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PgService],
    }).compile();

    service = module.get<PgService>(PgService);
  });

  test('refundPayment passes with valid data', () => {
    const refundPaymentDto = {
      appId: 'PG1',
    };

    const result = service.refundPayment(refundPaymentDto);

    expect(result).toBeTruthy();
  });

  test('refundPayment fails when appId is missing', () => {
    const refundPaymentDto = {
      appId: null,
    };

    try {
      service.refundPayment(refundPaymentDto);
    }
    catch(error) {
      expect(error).toBeInstanceOf(Error);
    }

    expect.assertions(1);
  });
});
