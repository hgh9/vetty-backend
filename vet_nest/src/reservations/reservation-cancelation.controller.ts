import { Controller, Get, Query } from '@nestjs/common';
import { ReservationCancelationService } from '@/reservations/reservation-cancelation.service';

@Controller('reservation-cancelation')
export class ReservationCancelationController {
  constructor(
    private reservationCancelationService: ReservationCancelationService,
  ) {}

  @Get('')
  async cancelReservation(@Query('id') id: number) {
    const result = await this.reservationCancelationService.cancelReservation(id);
    return result;
  }
}
