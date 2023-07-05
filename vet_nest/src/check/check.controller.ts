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
  //기본적인 로직을 완성해두고, 에러가 날 수 있는 가능한 모든 경우들을 생각해 test code를 작성하고 동작하는 코드에서 예외처리를 하는 방식으로 코드를 작성해 나갈 수 있습니다.
  @Get()
  async getAllReservation() {
    // 예약정보를 조회한다.
    try {
      const result = await this.checkService.getAllReservations();
      return {
        result: result,
        message: '예약조회가 완료되었습니다.',
      };
    } catch (e) {}
  }

  @Post(':id')
  async updateUserState(@Param() param: { id: number }, @Body() updateinfo) {
    // 예약상태변경
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

/**
 * @Post()
    addMenu(@Param('storeId') storeId: number, @Body() createMenuDto: CreateMenuDto) {
        return this.menuService.addMenu(storeId, createMenuDto);
    }
 */
