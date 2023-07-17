import { Controller, Post, Body, HttpException, Param, Patch } from '@nestjs/common';
import { PgPaymentRequest } from '@/payments/dto/pg-payment.request';
import { PgPaymentResponse } from '@/payments/dto/pg-payment.response';
import { v4 as uuidv4 } from 'uuid';
import { PgCancelPaymentRequest } from '@/payments/dto/pg-cancel-payment.request';
import { PgCancelPaymentResponse } from '@/payments/dto/pg-cancel-payment.response';
import { ApiTags } from '@nestjs/swagger';
import { FakePgPaymentRequest } from './request/fake-pg-payment.request';
import { FakePgPaymentResponse } from './response/fake-pg-payment.response';
import { FakePgCancelPaymentRequest } from './request/fake-pg-cancel-payment.request';
import { FakePgCancelPaymentResponse } from './response/fake-pg-cancel-payment.response';

@Controller('pg')
@ApiTags('FakePgController')
export class FakePgController {
  constructor() {}
  
  @Post('create')
  createPayment(@Body() param: FakePgPaymentRequest
  ): FakePgPaymentResponse {
    
    let response = new PgPaymentResponse();
    response.resultCode = 'OK';
    response.uuid = uuidv4();
    response.cardNumber = param['cardNumber'];
    response.amount = param['amount'];
    return response;
  }

  @Patch('cancel')
  cancelPayment(
    @Body() param: FakePgCancelPaymentRequest
  ): FakePgCancelPaymentResponse {
    return <FakePgCancelPaymentResponse>{
      resultCode: 'OK',
      uuid: param['uuid'] 
    };
  }
  
  @Post('refund')
  refundPayment(@Body() refundPaymentDto) {
    try {
      // const result = this.PgService.refundPayment(refundPaymentDto);
      return { result: {}, code: 200, message: 'OK' };
    }
    catch (error) {
      throw new HttpException({ result: false, message: error.message }, 400);
    }
  }
}
