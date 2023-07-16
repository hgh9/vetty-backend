import { ApiProperty } from "@nestjs/swagger";
import { PaymentMethod } from "../entity/payments.entity"
import { CreatePaymentDto } from "./create-payment.dto"

export class PgPaymentRequest {

  @ApiProperty({
    default: 'CARD',
    required: true, 
    type: 'string', 
    description: '결제방법',
  })
  method: PaymentMethod;
  @ApiProperty({
    default: '1234-1234-1234-1234',
    required: true, 
    type: 'string', 
    description: '결제번호',
  })
  cardNumber: string; 
  @ApiProperty({
    default: '10/23',
    required: true, 
    type: 'string', 
    description: '유효기간',
  })
  validPeriod: string;
  @ApiProperty({
    default: '10000',
    required: true, 
    type: 'number',
    description: '결제금액'
  })
  amount: number;
  @ApiProperty({
    default: 'WON',
    required: true, 
    type: 'string', 
    description: '통화코드'
  })
  currency: string;

  constructor() {
    // this.method = dto?.method ?? PaymentMethod.CARD;
    // this.cardNumber = '1234-1234-1234-1234';
    // this.validPeriod = '10/23';
    // this.amount = dto?.amount ?? 5000;
  }
}