import { Controller, Get, Inject, Query } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Reservation } from './entity/reservation.entity';

@Controller('reservation-cancelation')
export class ReservationCancelationController {
  constructor(
    @Inject('DATA_SOURCE')
    private dataSource: DataSource
  ) {}

  @Get('')
  async cancelReservation(@Query('id') id: number) {
    
    const reservationRepository = this.dataSource.getRepository(Reservation);
    return await reservationRepository.find();
    // if (id == -1) throw new InternalServerErrorException('예약정보를 찾을 수 없습니다.');
    // // const result = await this.reservationCancelationService.cancelReservation(id);
    // // return result;
    // return {
    //   result: true, 
    //   message: '예약이 취소되었습니다.'
    // };
  }
}
