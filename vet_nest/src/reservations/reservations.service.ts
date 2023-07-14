import { Inject, Injectable } from '@nestjs/common';
import { Reservation } from './entity/reservation.entity';
import { Between, DataSource, MoreThanOrEqual, Raw, Repository } from 'typeorm';
import { ReservastionsDto } from './dto/reservations.dto';
import { ReservationSearchDto } from './dto/reservation-search.dto';
import moment from 'moment';
import { ReservationReposiotory } from './repository/reservation-repository';
import { Payment } from '@/payments/entity/payments.entity';

@Injectable()
export class ReservationService {
  constructor(
    private readonly reservationRepository: ReservationReposiotory
  ) { }

  async create(data: ReservastionsDto): Promise<any> {
    // new Logger().verbose('create Reservations in repo', JSON.stringify(data));

    // const result = await this.reservationRepository.save(data);
    // console.log(result);
    // return {
    //   result: true,
    //   data: result,
    //   message: '예약이 완료되었습니다.',
    // };
  }

  async findAll(): Promise<Reservation[]> {
    return this.reservationRepository.find();
  }

  async getReservationsByUser(userId: number, searchQuery: ReservationSearchDto): Promise<Reservation[]> {
    //TODO: QueryExtension 사용 불가능한지 확인 -> TypeScript, TypeOrm
    return this.reservationRepository.getReservationsByUser(
      userId, 
      searchQuery.startDate, 
      searchQuery.endDate);
  }

  async getPaymentsByReservationId(reservationId: number): Promise<Payment[]> {
    return await this.reservationRepository.getPaymentsByReservationId(reservationId);
  }
}
