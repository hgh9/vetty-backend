import { Controller, Post, HttpException, Body } from '@nestjs/common';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(private PaymentsService: PaymentsService) {}

  @Post()
  async create(@Body() createPaymentDto) {
    const result = await this.PaymentsService.create(createPaymentDto).catch((error) => {
      throw new HttpException({ result: false, message: error.message }, 400);
    });

    return { result: result, code: 200, message: '/payments' };
  }

  @Post('cancel')
  async cancel(@Body() cancelPaymentDto) {
    const result = await this.PaymentsService.cancel(cancelPaymentDto).catch((error) => {
      throw new HttpException({ result: false, message: error.message }, 400);
    });

    return { result: result, code: 200, message: '/payments/cancel' };
  }

  @Post('refund')
  async refund(@Body() refundPaymentDto) {
    const result = await this.PaymentsService.refund(refundPaymentDto).catch((error) => {
      throw new HttpException({ result: false, message: error.message }, 400);
    });

    return { result: result, code: 200, message: '/payments/refund' };
  }
}
