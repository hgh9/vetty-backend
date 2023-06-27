import { BadRequestException, HttpException, HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Reservation } from '../reservations/entity/reservation.entity';
import { ReservationService } from './reservations.service';
import { IReservationsCancelation } from './reservation-cancelation.interface';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from './entity/payment.entity';

@Injectable()
// -> ReservationCancelationRepositoryService
export class ReservationCancelationService implements IReservationsCancelation {
  private reservationRepository: Repository<Reservation>;
  private paymentRepository: Repository<Payment>;
  constructor(
    @Inject('DATA_SOURCE')
    private readonly dataSource: DataSource
  ) {
    this.reservationRepository = this.dataSource.getRepository(Reservation);
    this.paymentRepository = this.dataSource.getRepository(Payment);
  }

  async cancelReservation(reservationId: number): Promise<boolean> {
    //1. 예약정보를 조회한다.
    const reservation = await this.getTargetReservation(reservationId);
    if (reservation == null) 
      throw new HttpException('예약정보를 찾을 수 없습니다.', HttpStatus.NOT_FOUND);

    //1-1. 예약 상태를 확인한다.
    if (reservation.status != 'C') 
      throw new HttpException('예약 취소할 수 없는 상태 입니다.', HttpStatus.FORBIDDEN);

    //1-2. 예약 취소가능 시간인지 확인한다.

    //2. 결제를 취소 한다.

    //2-1. 결제 상태를 확인한다.

    //2-2. 결제 취소를 요청한다.

    //3. 성공 시, 결제 취소 알림 메시지를 송신한다.

    //4. 예약 취소 알림 메시지를 송신한다.
    return Promise.resolve(true);
  }

  public async getTargetReservation(id: number): Promise<Reservation> {
    const reservations = await this.reservationRepository.find({
      relations: ['payments'],
      where: { id: id },
    });

    if (reservations.length == 0) {
      throw Error('예약 정보를 찾을 수 없습니다.');
    }
    return reservations[0];
  }

  public async getCompletedPaymentsByReservationId(
    id: number,
  ): Promise<Payment[]> {
    return await this.paymentRepository.find({
      where: {
        reservationId: id,
        status: 'C',
      }
    });
  }
}
