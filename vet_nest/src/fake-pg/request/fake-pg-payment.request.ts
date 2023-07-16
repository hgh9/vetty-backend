import { PaymentMethod } from "@/payments/entity/payments.entity";
import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class FakePgPaymentRequest {
  @ApiProperty({
    default: 'CARD',
    type: 'string', 
    description: '결제방법',
  })
  @IsOptional()
  method: PaymentMethod;
  @ApiProperty({
    default: '1234-1234-1234-1234',
    type: 'string', 
    description: '결제번호',
  })
  @IsOptional()
  cardNumber: string; 
  @ApiProperty({
    default: '10/23',
    type: 'string', 
    description: '유효기간',
  })
  @IsOptional()
  validPeriod: string;
  @ApiProperty({
    default: '10000',
    type: 'number',
    description: '결제금액'
  })
  @IsOptional()
  amount: number;
  @ApiProperty({
    default: 'WON',
    type: 'string', 
    description: '통화코드'
  })
  @IsOptional()
  currency: string;
}