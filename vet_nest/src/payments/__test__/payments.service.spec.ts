import { Test, TestingModule } from '@nestjs/testing';
import { PaymentsService } from '../payments.service';
import { PaymentsRepositoryMock } from '../repository/payments.repository.mock';
import { PaymentsRepository } from '../repository/payments.repository';
import { HttpService, HttpModule } from '@nestjs/axios';
import { of } from 'rxjs';
import { AxiosResponse } from 'axios';

// 여기만 하면 된다..
describe('CREATE PAYMENT', () => {
  let service: PaymentsService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        {
          provide: PaymentsRepository,
          useClass: PaymentsRepositoryMock,
        },
        PaymentsService,
        {
          provide: HttpService,
          useFactory: () => ({
            post: jest.fn(),
          }),
        },
      ],
    }).compile();
    service = module.get<PaymentsService>(PaymentsService);
    httpService = module.get<HttpService>(HttpService);
  });

  test('invalid data fails', async () => {
    const createPaymentDto = {
      reservationId: null,
      amount: 100,
    };

    try {
      await service.create(createPaymentDto);
    } catch (error) {
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
    } catch (error) {
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
      appId: 'PG1',
      amount: 200,
      status: 'done',
    };

    jest.spyOn(httpService, 'post').mockImplementation(() => {
      const test = of({
        data: {
          result: { code: 200, appId: 'PG1' },
        },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {},
      } as AxiosResponse<any>);

      console.log(typeof test);
      console.log(test);
    });

    const result = await service.create(createPaymentDto);

    expect(result).toEqual(createdPayment);
  });
});

describe('REFUND PAYMENT', () => {
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
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }

    expect.assertions(1);
  });

  test('refund fails when payment is not done', async () => {
    const cancelPaymentDto = { paymentId: 2 };

    try {
      await service.refund(cancelPaymentDto);
    } catch (error) {
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
