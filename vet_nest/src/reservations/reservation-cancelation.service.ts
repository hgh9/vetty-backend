import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import {
  Reservation,
  TreatmentStatus,
} from '../reservations/entity/reservation.entity';
import { ReservationService } from './reservations.service';
import { IReservationsCancelation } from './reservation-cancelation.interface';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from './entity/payment.entity';
import * as moment from 'moment';
import { PaymentFactoryService } from './fake-modules/payment-factory.service';
import { IPaymentService } from './fake-modules/payment-service.interface';
import { User } from '@/users/entity/users.entity';

@Injectable()
// -> ReservationCancelationRepositoryService
export class ReservationCancelationService implements IReservationsCancelation {
  private reservationRepository: Repository<Reservation>;
  private paymentRepository: Repository<Payment>;
  private paymentService: IPaymentService;
  constructor(
    @Inject('DATA_SOURCE')
    private readonly dataSource: DataSource,
    private readonly paymentFactory: PaymentFactoryService,
  ) {
    this.reservationRepository = this.dataSource.getRepository(Reservation);
    this.paymentRepository = this.dataSource.getRepository(Payment);
    this.paymentService = this.paymentFactory.getService('test');
  }

  async cancelReservation(reservationId: number): Promise<boolean> {
    //1. 예약정보를 조회한다.
    const reservation = await this.getTargetReservation(reservationId);

    //2. 예약 취소 가능 조건을 만족하는지 확인한다.
    await this.checkCancelableStatus(reservation);

    //3. 예약취소, 결제 취소 로직을 실행
    const canceledReservationAndPayments =
      this.doReservationAndPaymentCancel(reservation);

    //4. 예약 취소 알림 메시지를 송신한다.

    //5. 결제 취소 알림 메시지는 PaymentService의 역할로 본다.
    return Promise.resolve(true);
  }

  public async getTargetReservation(id: number): Promise<Reservation> {
    const reservations = await this.reservationRepository.find({
      relations: ['payments'],
      where: { id: id },
    });
    return reservations[0];
  }

  private checkCancelableStatus(reservation?: Reservation): void {
    if (reservation == null)
      throw new HttpException(
        '예약정보를 찾을 수 없습니다.',
        HttpStatus.NOT_FOUND,
      );

    //1-1. 예약 상태를 확인한다.
    if (reservation.status != TreatmentStatus.RESERVATION_COMPLETED)
      throw new HttpException(
        '예약 취소할 수 없는 상태 입니다.',
        HttpStatus.FORBIDDEN,
      );

    //1-2. 예약 취소가능 시간인지 확인한다.
    if (!this.isReservationCancelableTime(reservation.reservedAt)) {
      throw new HttpException(
        '예약 취소 가능 시간이 지났습니다.',
        HttpStatus.FORBIDDEN,
      );
    }
  }

  private isReservationCancelableTime(reservedAt: Date): boolean {
    const TIME_LIMIT = -1;
    const limit = moment(reservedAt).add(TIME_LIMIT, 'hours');
    const current = moment(new Date());
    console.log(`예약시간: ${reservedAt.toISOString()}`);
    console.log(`취소가능 최대시간: ${limit.toISOString()}`);
    console.log(`현재시간: ${current.toISOString()}`);
    console.log(`취소가능여부: ${current.isBefore(limit)}`);
    return current.isBefore(limit);
  }

  private async doReservationAndPaymentCancel(reservation: Reservation) {
    const reservationCancelResult = await this.doRepositoryUpdate(reservation);
    const paymentCancelResult = await this.doRequestPaymentCancel(
      reservation.payments,
    );

    return {
      reservation: reservationCancelResult,
      payment: paymentCancelResult,
    };
  }

  private async doRepositoryUpdate(
    reservation: Reservation,
  ): Promise<Reservation> {
    const queryRunner = await this.dataSource.createQueryRunner();
    await queryRunner.startTransaction();

    try {
      reservation.status = TreatmentStatus.RESERVATION_CANCELED;
      reservation.updatedAt = new Date();
      this.reservationRepository.save(reservation);
      await queryRunner.commitTransaction();
      return Promise.resolve(reservation);
    } catch (e) {
      console.log(`DB_ERROR: ${JSON.stringify(e)}`);
      queryRunner.rollbackTransaction();
      throw new InternalServerErrorException('DB 오류');
    }
  }

  private async doRequestPaymentCancel(
    payments: Payment[],
  ): Promise<Payment[]> {
    const targetPayments = payments?.filter((payment) => payment.status == 'C');
    const canceledPayments = await targetPayments.map(async (payment) => {
      this.paymentService.cancelPayment(payment.appId);
    });

    //TODO: 일부 실패시 어떤 처리를 해야지?
    console.log(
      targetPayments.length == canceledPayments.length
        ? '결제 취소 모두 성공'
        : '결제 취소 일부 실패',
    );

    //TODO: PayResult DTO 생성
    return Promise.resolve(targetPayments);
  }

  public async getCompletedPaymentsByReservationId(
    id: number,
  ): Promise<Payment[]> {
    return await this.paymentRepository.find({
      where: {
        reservationId: id,
        status: 'C',
      },
    });
  }
}
