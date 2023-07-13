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
import { ApiTags } from '@nestjs/swagger';
import { MapPipe } from '@automapper/nestjs';
import { BisunessException, NotEnoughParameterError } from 'util/exception.util';

@Controller('reservations')
@ApiTags('Reservations')
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
  async getReservations(
    @Query() param: ReservationSearchDto,
  ): Promise<Reservation[]> {
    try {
      
      const validationResult = param.validate();
      if (validationResult.length > 0) 
        throw new BisunessException(validationResult, '', '404');

      // TODO : Auth -> Claims.UserId
      const userId = 1; 
      
      //TODO: Mapper 적용 
      const reservations = await this.reservationService.getReservationsByUser(userId, param);
      return reservations;
    } 
    catch (e) {
      throw e;
      // switch (e.name) {
      //   case 'NotFoundException':
      //     throw new HttpException(e.message, HttpStatus.NOT_FOUND);
      //   case 'BadRequestException':
      //     throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
      //   case 'ForbiddenException':
      //     throw new HttpException(e.message, HttpStatus.FORBIDDEN);
      //   default:
      //     throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
      // }
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
