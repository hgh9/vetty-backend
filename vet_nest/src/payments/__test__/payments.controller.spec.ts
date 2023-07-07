import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';

const LOCAL_HOST = 'http://localhost:3001';

describe('CREATE PAYMENT', () => {
  let app: INestApplication;
  
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({}).compile();

    app = module.createNestApplication();
    await app.init;
  });
  
  test('POST /payments creates a new payment', () => {
    const createPaymentDto = {
      reservationId: 1,
      amount: 100,
    };
    
    request(LOCAL_HOST)
      .post('/payments')
      .send(createPaymentDto)
      .then((res: request.Response) => {
        expect(res.statusCode).toEqual(HttpStatus.CREATED);
      });
  });
  
  test('POST /payments fails with invalid data', () => {
    const invalidDto = {
      amount: 100,
    };
    
    request(LOCAL_HOST)
      .post('/payments')
      .send(invalidDto)
      .then((res: request.Response) => {
        expect(res.statusCode).toEqual(HttpStatus.BAD_REQUEST);
        expect(res.body.message).toEqual('invalid data');
      });
  });
});

describe('CANCEL PAYMENT', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({}).compile();

    app = module.createNestApplication();
    await app.init;
  });

  test('POST /payments/cancel cancels the payment', () => {
    const createPaymentDto = { reservationId: 1 };

    // Need Seeding...?
    request(LOCAL_HOST)
      .post('/payments/cancel')
      .send(createPaymentDto)
      .then((res: request.Response) => {
        expect(res.statusCode).toEqual(HttpStatus.OK);
      });
  });

  test('POST /payments/cancel fails with invalid data', () => {
    const invalidDto = {
      amount: 100,
    };

    request(LOCAL_HOST)
      .post('/payments/cancel')
      .send(invalidDto)
      .then((res: request.Response) => {
        expect(res.statusCode).toEqual(HttpStatus.BAD_REQUEST);
        expect(res.body.message).toEqual('invalid data');
      });
  });
});

describe('REFUND PAYMENT', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({}).compile();

    app = module.createNestApplication();
    await app.init;
  });

  test('POST /payments/refund refunds', () => {
    const refundPaymentDto = { reservationId: 1 };

    request(LOCAL_HOST)
      .post('/payments/refund')
      .send(refundPaymentDto)
      .then((res: request.Response) => {
        expect(res.statusCode).toEqual(HttpStatus.OK);
      });
  });

  test('POST /payments/refund fails with invalid data', () => {
    const invalidDto = {
      amount: 100,
    };

    request(LOCAL_HOST)
      .post('/payments/refund')
      .send(invalidDto)
      .then((res: request.Response) => {
        expect(res.statusCode).toEqual(HttpStatus.BAD_REQUEST);
        expect(res.body.message).toEqual('paymentId is required');
      });
  });
});
