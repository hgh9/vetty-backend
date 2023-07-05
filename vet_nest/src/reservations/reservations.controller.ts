import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  Logger,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ReservastionsDto } from './dto/reservations.dto';
import { ReservationService } from './reservations.service';
import { Reservation } from './entity/reservation.entity';
import { ReservationSearchDto } from './dto/reservation-search.dto';
import moment from 'moment';

@Controller('reservations')
export class ReservationsController {
  constructor(private reservationService: ReservationService) {}
  @Post()
  @HttpCode(200)
  async createReservation(@Body() reservationInfo: ReservastionsDto) {
    try {
      new Logger().verbose('create Reservations');

      // const result = await this.reservationService.create(reservationInfo);
      // return result;
      return null;
      // return {
      //   result: true,
      //   message: '예약이 완료되었습니다.',
      // };
    } catch (err) {
      throw new Error(err);
    }
  }

  @Get()
  @HttpCode(200)
  async getReservations(@Param() param: ReservationSearchDto): Promise<Reservation[]> {
    try {
      const start_date = moment(param.startDate);
      if (!start_date.isValid())
        throw new BadRequestException('날짜 형식이 올바르지 않습니다.');
      
      if (!moment().add(-5).isBefore(start_date))
        throw new BadRequestException('최대 5년 이전까지만 조회가 가능합니다.');
      
      return Promise.resolve([]);
    }
    catch(e) {

    }
  }

  // @Get()
  // async getByEmail(@Query() email: findByEmailDto) {
  //   try {
  //     return await this.reservationService.findByEmail(email);
  //   } catch (err) {
  //     throw new Error(err);
  //   }
  // }
}
