import { Controller, Get, HttpStatus, InternalServerErrorException, Query } from '@nestjs/common';
import { ReservationCancelationService } from '../reservations/reservation-cancelation.service';
import { ok } from 'assert';

@Controller('reservation-cancelation')
export class ReservationCancelationController {
  constructor(
    private reservationCancelationService: ReservationCancelationService,
  ) {}

  @Get('')
  async cancelReservation(@Query('id') id: number) {
    
    if (id == -1) throw new InternalServerErrorException('예약정보를 찾을 수 없습니다.');
    const result = await this.reservationCancelationService.cancelReservation(id);
    // return result;
    return {
      result: true, 
      message: '예약이 취소되었습니다.'
    };
  }
}
