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
    try {
      const result = await this.reservationCancelationService.cancelReservation(id);
      return {
        result: result, 
        message: '예약이 취소되었습니다.'
      };
    }
    catch(e) {
      return {
        result: false, 
        message: e.message
      }
    }
  }
}
