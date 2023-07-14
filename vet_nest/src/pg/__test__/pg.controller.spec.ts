import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';

const LOCAL_HOST = 'http://localhost:3001';

describe('createPayment', () => {
  let app: INestApplication;
  
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({}).compile();

    app = module.createNestApplication();
    await app.init;
  });
  
  test('POST /create makes a payment record', () => {
    const createPaymentDto = {
      amount: '100',
      reservationId: 1,
    };
    
    request(LOCAL_HOST)
      .post('/pg/create')
      .send(createPaymentDto)
      .then((res: request.Response) => {
        expect(res.statusCode).toEqual(HttpStatus.CREATED);
        expect(res.body.result).toEqual({ appId: 'PG' + createPaymentDto.reservationId });
      });
  });
  
  test('POST /create fails with invalid data', () => {
    const createPaymentDto = {
      amount: null,
      reservationId: 1,
    };
    
    request(LOCAL_HOST)
      .post('/pg/create')
      .send(createPaymentDto)
      .then((res: request.Response) => {
        expect(res.statusCode).toEqual(HttpStatus.BAD_REQUEST);
      });
  });
});

describe('refundPayment', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({}).compile();

    app = module.createNestApplication();
    await app.init;
  });
  
  test('POST /refund passes with valid appId', () => {
    const refundPaymentDto = {
      appId: 1,
    };

    request(LOCAL_HOST)
      .post('/pg/refund')
      .send(refundPaymentDto)
      .then((res: request.Response) => {
        expect(res.statusCode).toEqual(HttpStatus.OK);
      });
  });
  
  test('POST /refund fails when there is no appId', () => {
    const refundPaymentDto = {
      appId: null,
    };
    
    request(LOCAL_HOST)
      .post('/pg/refund')
      .send(refundPaymentDto)
      .then((res: request.Response) => {
        expect(res.statusCode).toEqual(HttpStatus.BAD_REQUEST);
      });
  });
});
