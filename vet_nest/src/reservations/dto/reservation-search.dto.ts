import { ApiParam, ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class ReservationSearchDto {
  
  @ApiProperty({
    default: '2023-01-01',
    required: true,
    description: '조회 시작일',
    name: 'startDate'
  })
  @IsString()
  startDate: string;

  @ApiProperty({
    default: '2023-12-31',
    required: true,
    type: 'string',
    name: 'endDate',
    description: '조회 시작일'
  })
  @IsString()
  endDate: string;

//   constructor() {}
}