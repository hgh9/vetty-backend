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
import { ApiTags } from '@nestjs/swagger';
import { ReservationFacade } from './reservation-facade';

@Controller('reservation-cancelation')
@ApiTags('Reservation-cancelation')
export class ReservationCancelationController {
  constructor(
    // private reservationCancelationService: ReservationCancelationService,
    private reservationFacadeService: ReservationFacade
  ) {}

  @Get(':id')
  async cancelReservation(@Param('id') id: number) {
    try {
      return await this.reservationFacadeService.cancelReservation(id);
    } 
    catch (e) {
      throw e;
    }
  }
}
