import { BadRequestException } from "@nestjs/common";
import { ApiParam, ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import * as moment from "moment";

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

  validate(): any[] { //TODO -> Error
    let errors = [];
    const startDate = moment(this.startDate, 'YYYY-MM-DD');
      if (!startDate.isValid()) {
        errors.push({key: 'startDate', error: '날짜 형식이 올바르지 않습니다.'});
      }

      const endDate = moment(this.endDate, 'YYYY-MM-DD');
      if (!endDate.isValid()){
        errors.push({key: 'endDate', error: '날짜 형식이 올바르지 않습니다.'});
      }
        
      if (startDate.isBefore(moment().add(-5, 'years'))){
        errors.push({key: 'startDate', error: '최대 5년 이전까지만 조회가 가능합니다.'});
      }
        
      const diffDays = endDate.diff(startDate, 'days');
      if (diffDays > 365){
        errors.push({key: 'startDate', error: '조회 범위는 최대 1년 입니다.'});
      }
        
    return errors;
  }
}