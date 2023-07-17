import {
  Body,
  Controller,
  Get,
  HttpCode,
  Logger,
  Post,
  Query,
} from '@nestjs/common';
import {
  ReservationProcessDto as ReservationProcessCommand,
} from './dto/reservations.dto';
import { ReservationService } from './reservations.service';
import { Reservation } from './entity/reservation.entity';
import { ReservationSearchDto } from './dto/reservation-search.dto';
import {
  BusinessException
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
  async createReservation(@Body() reservationInfo: ReservationProcessCommand) {
    try {
      new Logger().verbose('---Post Reservations---');

      // 예약 정보들 저장
      const reservationResult = await this.reservationService.setReservation(
        reservationInfo,
      );

      // 페이먼트 저장
      // await this.paymentsService.create(reservationInfo.payments);

      // 그 타임 슬롯 저장
      await this.reservationService.setReserveTime(reservationInfo.timeSlot);

      return {
        result: true,
        data: reservationResult,
        message: '예약이 완료되었습니다.',
      };
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
  async getReservations(
    @Query() param: ReservationSearchDto,
  ): Promise<Reservation[]> {
    try {
      const validationResult = param.validate();
      if (validationResult.length > 0) {
        throw new BusinessException(validationResult, '', '404');
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
    }
  }
}
