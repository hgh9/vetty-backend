import { Controller, Get, Inject, NotFoundException, Query } from '@nestjs/common';
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
    
    const result = await this.reservationCancelationService.cancelReservation(id);
    if (!result) {
      return {
        result: false, 
        message: '예약을 취소할 수 없습니다.'
      };
    }
    
    return {
      result: true, 
      message: '예약이 취소되었습니다.'
    };
  }
}
