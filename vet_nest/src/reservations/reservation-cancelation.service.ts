import { BadRequestException, HttpException, HttpStatus, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Reservation, ReservationStatus } from '../reservations/entity/reservation.entity';
import { ReservationService } from './reservations.service';
import { IReservationsCancelation } from './reservation-cancelation.interface';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from './entity/payment.entity';
import * as moment from 'moment';
import { PaymentFactoryService } from './fake-modules/payment-factory.service';
import { IPaymentService } from './fake-modules/payment-service.interface';

@Injectable()
// -> ReservationCancelationRepositoryService
export class ReservationCancelationService implements IReservationsCancelation {
  private reservationRepository: Repository<Reservation>;
  private paymentRepository: Repository<Payment>;
  private paymentService: IPaymentService;
  constructor(
    @Inject('DATA_SOURCE')
    private readonly dataSource: DataSource,
    private readonly paymentFactory: PaymentFactoryService
  ) {
    this.reservationRepository = this.dataSource.getRepository(Reservation);
    this.paymentRepository = this.dataSource.getRepository(Payment);
    this.paymentService = this.paymentFactory.getService('test');
  }

  async cancelReservation(reservationId: number): Promise<boolean> {
    
    //1. 예약정보를 조회한다.
    const reservation = await this.getTargetReservation(reservationId);
    if (reservation == null) 
      throw new HttpException('예약정보를 찾을 수 없습니다.', HttpStatus.NOT_FOUND);

    //1-1. 예약 상태를 확인한다.
    if (reservation.status != ReservationStatus.COMPLETED) 
      throw new HttpException('예약 취소할 수 없는 상태 입니다.', HttpStatus.FORBIDDEN);

    //1-2. 예약 취소가능 시간인지 확인한다.
    if (!this.isReservationCancelableTime(reservation.reservedAt)) {
      throw new HttpException('예약 취소 가능 시간이 지났습니다.', HttpStatus.FORBIDDEN);
    }


    // const queryRunner = await this.dataSource.createQueryRunner();
    // await queryRunner.startTransaction();

    // await this.dataSource.transaction(async (entityManager) => {
      reservation.status = ReservationStatus.CANCELED;
      reservation.updatedAt = new Date();
      this.reservationRepository.save(reservation);
      // entityManager.save(reservation);
      
      // await queryRunner.commitTransaction();
    // })
    // .catch((error) => {
      // console.log(`DB_ERROR: ${JSON.stringify(error)}`);
      // queryRunner.rollbackTransaction();
      // throw new HttpException('시스템 오류 입니다.(DB)', HttpStatus.INTERNAL_SERVER_ERROR);
    // });

    //2. 결제를 취소 한다.
    const payments = reservation.payments?.filter((payment) => {
      return payment.status == 'C';
    });

    console.log(`payments:${JSON.stringify(payments)}`);
    let paymentCancelSuccessCnt = 0;
    
    payments.forEach(async (payment) => {
      const result = await this.paymentService.cancelPayment(payment.appId);
      console.log(`취소 결과[${payment.appId}]: ${result}}`);
      if (result) {
        paymentCancelSuccessCnt++;
      }
    });

    //3. 성공 시, 결제 취소 알림 메시지를 송신한다.
    if (paymentCancelSuccessCnt == payments.length) {
      //TODO: Alarm 보내기 
    }

    //4. 예약 취소 알림 메시지를 송신한다.
    // TODO: Alarm 보내기 

    return Promise.resolve(true);
  }

  private isReservationCancelableTime(reservedAt: Date): boolean 
  {
    const TIME_LIMIT = 1;
    const limit = moment(reservedAt).add(TIME_LIMIT, 'hours');
    const current = moment();
    return current.isBefore(limit);
  }

  public async getTargetReservation(id: number): Promise<Reservation> {
    const reservations = await this.reservationRepository.find({
      relations: ['payments'],
      where: { id: id },
    });
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
