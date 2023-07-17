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
import { ReservastionsDto } from '@/reservations/dto/reservations.dto';

@Controller('diagnosis')
@ApiTags('Dignosis')
export class DisgnosisController {
  constructor(private DiagnosisService: DiagnosisService) {}

  @Get(':vetId/reservations')
  async getAllReservation(
    @Param('vetId') vetId: number,
    @Body('receptionMethod') receptionMethod: string,
  ) {
    const result = await this.DiagnosisService.getAllReservation(
      vetId,
      receptionMethod,
    );
    return {
      result: result,
      message: '예약조회가 완료되었습니다.',
    };
  }

  @Put('/:reservationId')
  async updateReservaionStatus(@Param('reservationId') reservationId: number) {
    const result = await this.DiagnosisService.updateReservaionStatus(
      reservationId,
    );
    return {
      result: result,
      message: '상태변경이 완료 되었습니다.',
    };
  }

  @Put('/:reservationId/completed')
  async completeDignosis(
    @Param('reservationId') reservationId: number,
    @Body('treatmentResult') treatmentResult: string,
  ) {
    const result = await this.DiagnosisService.completeDignosis(
      reservationId,
      treatmentResult,
    );
    return {
      result: result,
      message: '진료가 완료 되었습니다.',
    };
  }

  @Get(':vetId/vetlist') //병원의 진료목록조회
  async getAllDiagnosis(
    @Param('vetId') vetId: number,
    @Body('treatmentStatus') treatmentStatus: number,
  ) {
    const result = await this.DiagnosisService.getAllDiagnosis(
      vetId,
      treatmentStatus,
    );
    return {
      result: result,
      message: '진료목록 조회 완료되었습니다.',
    };
    //파라미터값 에러
  }

  // @Post('/:reservationId/payments') // 진료비 결제 요청
  // async completePayment(@Param() param: { userId: number }) {
  //   // 예약정보를 조회한다.
  //   //파마리터로 값 가져와야해
  //   const result = await this.DiagnosisService.completePayment(param.userId);
  //   return {
  //     result: result,
  //     message: `결제가 완료되었습니다.`,
  //   };
  // }

  @Get('/:userId/diagnosis') // 고객의 진료 목록 조회 //예약빼고
  async getDiagnosisListByUser(@Param('userId') userId: number) {
    const result = await this.DiagnosisService.getDiagnosisByUser(userId);
    return {
      result: result,
      message: `${userId}의 진료 목록을 조회하였습니다.`,
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
