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
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { ReservastionsDto } from './dto/reservations.dto';
import { ReservationService } from './reservations.service';
import { Reservation } from './entity/reservation.entity';
import { ReservationSearchDto } from './dto/reservation-search.dto';
import * as moment from 'moment';
import { MapPipe } from '@automapper/nestjs';
import {
  BisunessException,
  NotEnoughParameterError,
} from 'util/exception.util';
import { ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CheckingDateCommand, SetTimeSlotCommand } from './dto/timeslot.dto';
import TimeSlotMananger from './slot-manager/slot-manger.service';
import { PaymentsService } from '@/payments/payments.service';

@Controller('reservations')
@ApiTags('Reservations')
export class ReservationsController {
  constructor(
    private reservationService: ReservationService, // private timeSlotManager: TimeSlotMananger,
    private paymentsService: PaymentsService,
  ) {}
  @Post()
  @HttpCode(200)
  @UseInterceptors()
  async createReservation(@Body() reservationInfo: ReservastionsDto) {
    try {
      new Logger().verbose('create Reservations');
      const timeSlotManager = new TimeSlotMananger();

      // 예약 정보들 저장
      await this.reservationService.setReservation(reservationInfo);

      // 페이먼트 저장
      // payments()
      await this.paymentsService

      // 그 타임 슬롯 저장
      timeSlotManager.setTimeSlot(reservationInfo.timeSlot.time);

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

  @Post('set/time')
  @HttpCode(200)
  async setTimeSlot(@Body() info: SetTimeSlotCommand): Promise<any> {
    // 예약 하기
    const result = new TimeSlotMananger();
    result.setTimeSlot(info.time);

    return result;
  }

  @Get('available/time')
  @HttpCode(200)
  async checkingTimeSlot(@Query() date: CheckingDateCommand): Promise<any> {
    // 예약 가능한 날짜를 체크한다.

    const result = this.reservationService.getAvailableTime(date);

    return result;
  }

  @Get()
  @HttpCode(200)
  // @UseInterceptors(CustomInterceptor)
  async getReservations(
    @Query() param: ReservationSearchDto,
  ): Promise<Reservation[]> {
    try {
      const validationResult = param.validate();
      if (validationResult.length > 0) {
        throw new BisunessException(validationResult, '', '404');
      }

      // TODO : Auth -> Claims.UserId
      const userId = 1;

      //TODO: Mapper 적용
      const reservations = await this.reservationService.getReservationsByUser(
        userId,
        param,
      );
      return reservations;
    } catch (e) {
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
}
