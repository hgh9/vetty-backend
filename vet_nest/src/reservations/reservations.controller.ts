import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Logger,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ReservastionsDto } from './dto/reservations.dto';
import { ReservationService } from './reservations.service';
import { Reservation } from './entity/reservation.entity';
import { ReservationSearchDto } from './dto/reservation-search.dto';
import * as moment from 'moment';

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
  async getReservations(@Query() param: ReservationSearchDto): Promise<Reservation[]> {
    try {
      //TODO: validation -> dto or dto validator 
      const startDate = moment(param.startDate, 'YYYY-MM-DD');
      if (!startDate.isValid())
        throw new BadRequestException('날짜 형식이 올바르지 않습니다.');

      const endDate = moment(param.endDate, 'YYYY-MM-DD');
      if (!endDate.isValid())
        throw new BadRequestException('날짜 형식이 올바르지 않습니다.');
      
      if (startDate.isBefore(moment().add(-5, 'years')))
        throw new BadRequestException('최대 5년 이전까지만 조회가 가능합니다.');
      
      const diffDays = endDate.diff(startDate, 'days');
      console.log(`diffDays - ${diffDays}`);
      if (diffDays > 365)
        throw new BadRequestException('조회 범위는 최대 1년 입니다.');
    
      const userId = 1;
      return await this.reservationService.getReservationsByUserId(userId, param);
    }
    catch(e) {
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

  // @Get()
  // async getByEmail(@Query() email: findByEmailDto) {
  //   try {
  //     return await this.reservationService.findByEmail(email);
  //   } catch (err) {
  //     throw new Error(err);
  //   }
  // }
}
