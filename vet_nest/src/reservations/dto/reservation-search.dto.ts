import { ApiParam, ApiProperty } from "@nestjs/swagger";

export class ReservationSearchDto {
  
  @ApiProperty({
    default: '2023-01-01',
    required: true,
    type: 'string',
    name: 'startDate',
    description: '조회 시작일'
  })
  startDate: Date;

  @ApiProperty({
    default: '2023-12-31',
    required: true,
    type: 'string',
    name: 'startDate',
    description: '조회 시작일'
  })
  endDate: Date;

}