import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";


export class FakePgCancelPaymentRequest {
  @IsOptional()
  @ApiProperty({
    default: '1234-1234-1234-1234',
    type: 'string',
    description: '결제 uuid'
  })
  uuid: string;
}