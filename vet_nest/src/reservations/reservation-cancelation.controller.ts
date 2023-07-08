import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param
} from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Reservation } from './entity/reservation.entity';
import { ReservationCancelationService } from './reservation-cancelation.service';

@Controller('reservation-cancelation')
export class ReservationCancelationController {
  constructor(
    private reservationCancelationService: ReservationCancelationService,
  ) {}

  @Get(':id')
  async cancelReservation(@Param('id') id: number) {
    try {
      const result = await this.reservationCancelationService.cancelReservation(id);
      return {
        result: result,
        message: '예약이 취소되었습니다.',
      };
    } catch (e) {
      switch (e.name) {
        case 'NotFoundException':
          throw new HttpException(e.message, HttpStatus.NOT_FOUND);
        case 'BadRequestException':
          throw new HttpException(e.message, HttpStatus.BAD_REQUEST);  
        case 'ForbiddenException':
          throw new HttpException(e.message, HttpStatus.FORBIDDEN);  
        default:
          throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }
}
