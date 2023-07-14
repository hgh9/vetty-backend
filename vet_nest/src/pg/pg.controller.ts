import { Controller, Post, Body, HttpException } from '@nestjs/common';
import { PgService } from './pg.service';

@Controller('pg')
export class PgController {
  constructor(private PgService: PgService) {}
  
  @Post('create')
  createPayment(@Body() createPaymentDto) {
    try {
      const result = this.PgService.createPayment(createPaymentDto);
      return { result: result, code: 201, message: 'CREATED' };
    }
    catch (error) {
      throw new HttpException({ result: false, message: error.message }, 400);
    }
  }
  
  @Post('refund')
  refundPayment(@Body() refundPaymentDto) {
    try {
      const result = this.PgService.refundPayment(refundPaymentDto);
      return { result: result, code: 200, message: 'OK' };
    }
    catch (error) {
      throw new HttpException({ result: false, message: error.message }, 400);
    }
  }
}
