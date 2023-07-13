import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseFilters,
} from '@nestjs/common';

import { Reservation } from '@/reservations/entity/reservation.entity';
import { DiagnosisService } from './diagnosis.service';
import { HttpExceptionFilter } from './exceptions/http-exception.filter';
import { ApiTags } from '@nestjs/swagger';

// http요청 처리 및 checkservice를 호출해서 예약정보 반환 -> 의존성주입
@Controller('diagnosis')
@UseFilters(HttpExceptionFilter)
@ApiTags('Dignosis')
export class DisgnosisController {
  constructor(private readonly DiagnosisService: DiagnosisService) {}
  //기본적인 로직을 완성해두고, 에러가 날 수 있는 가능한 모든 경우들을 생각해 test code를 작성하고 동작하는 코드에서 예외처리를 하는 방식으로 코드를 작성해 나갈 수 있습니다.
  @Get()
  async getAllReservation() {
    // 예약정보를 조회한다.
    const result = await this.DiagnosisService.getAllReservations();
    return {
      result: result,
      message: '예약조회가 완료되었습니다.',
    };
  }

  @Get('/:vetId') //병원의 진료목록조회
  async getAllDiagnosis(
    @Param() param: { id: number },
    @Body() body: { treatmentStatus: number },
  ) {
    // 예약정보를 조회한다.
    //파마리터로 값 가져와야해
    const result = await this.DiagnosisService.getDiagnosisList(
      param.id,
      body.treatmentStatus,
    );
    return {
      result: result,
      message: '예약조회가 완료되었습니다.',
    };
    //파라미터값 에러
  }

  @Put('/:reservationId')
  async updateReservaionStatus(@Param() param: { id: number }) {
    // 예약상태변경
    const result = await this.DiagnosisService.updateReservaionStatus(param.id);
    return {
      result: result,
      message: '상태변경이 완료 되었습니다.',
    };
    //파라미터값 에러
  }

  @Post('/:id')
  async completeDignosis(@Param() param: { id: number }) {
    // 예약상태변경
    const result = await this.DiagnosisService.completeDignosis(param.id);
    return {
      result: result,
      message: '진료가 완료 되었습니다.',
    };
  }
}
