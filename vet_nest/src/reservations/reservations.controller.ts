import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ReservastionsDto, findByEmailDto } from './dto/reservations.dto';
import { ReservationService } from './reservations.service';

@Controller('reservations')
export class ReservationsController {
  constructor(private reservationService: ReservationService) {}
  @Post()
  async createReservation(@Body() reservationInfo: ReservastionsDto) {
    try {
      return await this.reservationService.create(reservationInfo);
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
