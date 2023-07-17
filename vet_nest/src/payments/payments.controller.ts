import { Controller, Post, HttpException, Body, Req, Get, Query, Patch, Param, HttpStatus } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { SearchPaymentDto } from './dto/search-payment.dto';
import { ApiTags } from '@nestjs/swagger';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Controller('payments')
@ApiTags('PaymentController')
export class PaymentsController {
  constructor(private paymentsService: PaymentsService) {}

  @Get()
  async getPaymentsByUserId(@Query() searchParam: SearchPaymentDto) {
    //TODO: -> Requeset에서 Auth 정보 가져오기;
    const userId = 1;
    try {
      //TODO: SearchParam Validation 
      //TODO: Payment -> PaymentResponse
      return await this.paymentsService.getPaymentsByUserId(userId, searchParam);
    } 
    catch (e) {
      throw e;
    }
  }
  
  @Post()
  async postPayment(@Body() createPaymentDto: CreatePaymentDto) {
    const result = await this.paymentsService.create(createPaymentDto).catch(
      (error) => {
        throw new HttpException({ result: false, message: error.message }, 400);
      },
    );

    return {status: HttpStatus.CREATED};
  }

  @Patch('{id}/cancel')
  async cancelPayment(@Param('id') id: number) {
    return id;
  }
}
