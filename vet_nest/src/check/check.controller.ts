import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
} from '@nestjs/common';
import { CheckService } from './check.service';
import { Reservation } from '@/reservations/entity/reservation.entity';

// http요청 처리 및 checkservice를 호출해서 예약정보 반환 -> 의존성주입
@Controller('check')
export class CheckController {
  constructor(private readonly checkService: CheckService) {}

  @Get()
  async getAllReservation() {
    //전체 예약정보조회인지 보호자와반려견을 일치시킨 예약조회인지
    // return 'hello world';
    try {
      const result = await this.checkService.getAllReservations(); // checkService안에 있는 함수 값을 return 한다.
      console.log('결과 조회', result);
      return {
        result: result,
        message: '예약조회가 완료되었습니다.',
      };
    } catch (e) {}
  }

  // 진료목록,진료정보를 조회한다.

  // 고객의 진료 목록을 조회한다.
  // 고객의상세 정보를 조회한다.
  // 예약상태변경
  @Post(':id')
  async updateUserState(@Param() param: { id: number }, @Body() updateinfo) {
    try {
      const result = await this.checkService.updateUserState(param, updateinfo);
      console.log('body', updateinfo);
      console.log('id', param);
      return {
        result: result,
        message: '상태변경이 완료 되었습니다.',
      };
    } catch (e) {}
  }
}
