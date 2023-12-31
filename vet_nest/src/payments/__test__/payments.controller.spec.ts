import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';

const LOCAL_HOST = 'http://localhost:3001';

describe('결제 컨트롤러 - PaymentConctroller' , () => {
  let app: INestApplication;
  
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({}).compile();

    app = module.createNestApplication();
    await app.init();
  });

  describe('GET /payments', () => {

    it('사용자의 결제 목록을 조회할 경우, Payment[]를 반환한다.', async() => {
      //Arrange 

      //Act
      const res = await request('http://localhost:3001').get(`/payments`); 

      //Assert
      expect(res.status).toBe(HttpStatus.OK);
      // expect(res.data)


    })
  });

});
  
//   test('POST /payments creates a new payment', () => {
//     const createPaymentDto = {
//       reservationId: 1,
//       amount: 100,
//     };
    
//     request(LOCAL_HOST)
//       .post('/payments')
//       .send(createPaymentDto)
//       .then((res: request.Response) => {
//         expect(res.statusCode).toEqual(HttpStatus.CREATED);
//       });
//   });
  
//   test('POST /payments fails with invalid data', () => {
//     const invalidDto = {
//       amount: 100,
//     };
    
//     request(LOCAL_HOST)
//       .post('/payments')
//       .send(invalidDto)
//       .then((res: request.Response) => {
//         expect(res.statusCode).toEqual(HttpStatus.BAD_REQUEST);
//         expect(res.body.message).toEqual('invalid data');
//       });
//   });
// });

// describe('REFUND PAYMENT', () => {
//   let app: INestApplication;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({}).compile();

//     app = module.createNestApplication();
//     await app.init;
//   });

//   test('POST /payments/refund refunds', () => {
//     const refundPaymentDto = { reservationId: 1 };

//     request(LOCAL_HOST)
//       .post('/payments/refund')
//       .send(refundPaymentDto)
//       .then((res: request.Response) => {
//         expect(res.statusCode).toEqual(HttpStatus.OK);
//       });
//   });

//   test('POST /payments/refund fails with invalid data', () => {
//     const invalidDto = {
//       amount: 100,
//     };

//     request(LOCAL_HOST)
//       .post('/payments/refund')
//       .send(invalidDto)
//       .then((res: request.Response) => {
//         expect(res.statusCode).toEqual(HttpStatus.BAD_REQUEST);
//         expect(res.body.message).toEqual('paymentId is required');
//       });
//   });
// });
