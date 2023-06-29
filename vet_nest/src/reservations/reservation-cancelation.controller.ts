import { Controller, Get, HttpException, Inject, NotFoundException, Query } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Reservation } from './entity/reservation.entity';
import { ReservationCancelationService } from './reservation-cancelation.service';

@Controller('reservation-cancelation')
export class ReservationCancelationController {
  constructor(
    private reservationCancelationService: ReservationCancelationService
  ) {}

  @Get()
  async cancelReservation(@Query('id') id: number) {
    try {
      const result = await this.reservationCancelationService.cancelReservation(id);
      return {
        result: result, 
        message: '예약이 취소되었습니다.'
      };
    }
    catch(e) {
      //TODO: ErrorHandler(Filter | interceptor) 구현
      // -> Feedback : 서비스에서는 HttpException이 아닌 일반적인 Exception throw
      // -> CommonResponse class 구현하고, 해당 class 사용할 것. 
      // -> 회사 -> CustomAppException 과 같은 역할
      switch(e.name) {
        case 'HttpException': 
          throw new HttpException ({
            result: false, 
            message: e.response
          }, e.status);
        default: 
          throw new HttpException({
            result: false, 
            message: e.message
          }, 500);
      }
    }
  }
}
