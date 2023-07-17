import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class SearchPaymentDto {
  @ApiProperty({
    type: 'string',
    description: '조회 시작일(YYYY-MM-DD)'
  })
  @IsOptional()
  startDate: string;
  @ApiProperty({
    type: 'string',
    description: '조회 종료일(YYYY-MM-DD)'
  })
  @IsOptional()
  endDate: string;  
}