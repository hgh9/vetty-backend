import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseFilters,
} from '@nestjs/common';

import { DiagnosisService } from './diagnosis.service';
import { ApiTags } from '@nestjs/swagger';
import { get } from 'http';

// http요청 처리 및 checkservice를 호출해서 예약정보 반환 -> 의존성주입
@Controller('diagnosis')
// @UseFilters(HttpExceptionFilter)
@ApiTags('Dignosis')
export class DisgnosisController {
  constructor(private DiagnosisService: DiagnosisService) {}
  //기본적인 로직을 완성해두고, 에러가 날 수 있는 가능한 모든 경우들을 생각해 test code를 작성하고 동작하는 코드에서 예외처리를 하는 방식으로 코드를 작성해 나갈 수 있습니다.
  @Get(':vetId/reservations') // 예약정보를 조회
  async getAllReservation(
    @Param() param: { vetId: number },
    @Body() body: { receptionMethod: string },
  ) {
    // 예약정보를 조회한다. -> 예약으로 이동해야할거같은딩
    const result = await this.DiagnosisService.getAllReservation(
      param.vetId,
      body.receptionMethod,
    );
    return {
      result: result,
      message: '예약조회가 완료되었습니다.',
    };
  }

  @Put(':reservationId/status') //예약상태 -> 진료중으로 변경
  async updateReservaionStatus(@Param() param: { reservationId: number }) {
    const result = await this.DiagnosisService.updateReservaionStatus(
      param.reservationId,
    );
    return {
      result: result,
      message: '상태변경이 완료 되었습니다.',
    };
  }

  // 진료중 -> 진료완료
  @Post('/:reservationId/status')
  async completeDignosis(
    @Param() param: { reservationId: number },
    @Body() body: { treatmentResult: string },
  ) {
    console.log('여기', body.treatmentResult);
    const result = await this.DiagnosisService.completeDignosis(
      param.reservationId,
      body.treatmentResult,
    );
    return {
      result: result,
      message: '진료가 완료 되었습니다.',
    };
  }

  @Get(':vetId/vetlist') //병원의 진료목록조회
  async getAllDiagnosis(
    @Param() param: { vetId: number },
    @Body() body: { treatmentStatus: number },
  ) {
    const result = await this.DiagnosisService.getDiagnosisList(
      param.vetId,
      body.treatmentStatus,
    );
    return {
      result: result,
      message: '진료목록 조회 완료되었습니다.',
    };
    //파라미터값 에러
  }

  @Post('/:reservationId/payments') // 진료비 결제 요청
  async completePayment(@Param() param: { userId: number }) {
    // 예약정보를 조회한다.
    //파마리터로 값 가져와야해
    const result = await this.DiagnosisService.completePayment(param.userId);
    return {
      result: result,
      message: `결제가 완료되었습니다.`,
    };
  }

  @Get('/:userId/diagnosis') // 고객의 진료 목록 조회 //예약빼고
  async getDiagnosisListByUser(@Param() param: { userId: number }) {
    const result = await this.DiagnosisService.getDiagnosisByUser(param.userId);
    return {
      result: result,
      message: `${param.userId}의 진료 목록을 조회하였습니다.`,
    };
  }

  @Get('/:userId/diagnosis/detail') // 고객의 진료 상세 조회
  async getDetailDiagnosisByUser(
    @Param() param: { userId: number },
    @Body() body: { reservationid: number; treatmentStatus: number },
  ) {
    const result = await this.DiagnosisService.getDiagnosisDetail(
      param.userId,
      body.reservationid,
      body.treatmentStatus,
    );
    return {
      result: result,
      message: `${param.userId}의 진료 상세 내역을 조회하였습니다.`,
    };
  }
}
