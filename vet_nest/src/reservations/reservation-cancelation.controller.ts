import {
  Controller,
  Get,
  Param
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ReservationFacade } from './reservation-facade';

@Controller('reservation-cancelation')
@ApiTags('Reservation-cancelation')
export class ReservationCancelationController {
  constructor(
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
