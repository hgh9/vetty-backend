import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ReservastionsDto, findByEmailDto } from './dto/reservations.dto';
import { ReservationService } from './reservations.service';

@Controller('reservations')
export class ReservationsController {
  constructor(private reservationService: ReservationService) {}
  @Post()
  async createReservation(@Body() reservationInfo: ReservastionsDto) {
    try {
      // const result = await this.reservationService.create(reservationInfo);

      return {
        result: true,
        message: '예약이 완료되었습니다.',
      };
    } catch (err) {
      throw new Error(err);
    }
  }


  @Get()
  async getByEmail(@Query() email: findByEmailDto) {
    try {
      return await this.reservationService.findByEmail(email);
    } catch (err) {
      throw new Error(err);
    }
  }
}
