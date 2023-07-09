import { User } from '../users/entity/users.entity';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { TreatmentResult } from './entity/TreatmentResult.entity';
import { Reservation } from '../reservations/entity/reservation.entity';
import exp from 'constants';

@Injectable()
export class DiagnosisService {
  private reservationRepository: Repository<Reservation>;
  private treatmentRepository: Repository<TreatmentResult>;
  constructor(
    @Inject('DATA_SOURCE')
    private readonly dataSource: DataSource,
  ) {
    this.reservationRepository = this.dataSource.getRepository(Reservation);
  }

  public async getAllReservations() {
    const getAllReservation = await this.reservationRepository.find({
      where: {
        status: 1,
      },
    });

    if (!getAllReservation) {
      throw new BadRequestException('예약정보가 없습니다.');
    }
    // 값을 불러오지 못했을 경우의 에러처리 필요
    return getAllReservation;
  }

  public async getAllDiagnosis() {
    const getAllDiagnosis = await this.treatmentRepository.find();

    if (!getAllDiagnosis) {
      throw new BadRequestException('진료목록이 없습니다.');
    }
    // 값을 불러오지 못했을 경우의 에러처리 필요
    return getAllDiagnosis;
  }

  public async updateReservaionStatus(id: number) {
    // 진료중으로 변경
    // 아에 Dto 넘기면 값을 다 안써도 값을 불러올 수 있다
    const reservationInfo = await this.reservationRepository.findOneBy({
      id,
    });

    //validation
    const validationReservationStatus = this.checkReservationStatus_cancle(
      reservationInfo.status,
    );
    if (!validationReservationStatus) {
      return validationReservationStatus;
    }

    reservationInfo.status = 2;
    reservationInfo.updatedAt = new Date();
    await this.reservationRepository.save(reservationInfo);
  }

  // switch 문으로 변경할 수 있겠다.
  checkReservationStatus_cancle(reservationStatus: number) {
    if (reservationStatus === 2) {
      throw new BadRequestException('진료 중인 상태입니다.');
    }
    if (reservationStatus === 3) {
      throw new BadRequestException('진료 완료 상태입니다.');
    }
    if (reservationStatus === -1) {
      throw new BadRequestException('예약이 취소된 상태입니다.');
    }
    if (reservationStatus === -2) {
      throw new BadRequestException('진료가 취소된 상태입니다.');
    }
    return true;
  }

  // 진료를 완료 한다.
  public async completeDignosis(id: number) {
    const reservationInfo = await this.reservationRepository.findOneBy({
      id,
    });
    if (reservationInfo.status === 2) {
      reservationInfo.status = 3;
      reservationInfo.updatedAt = new Date();
      await this.reservationRepository.save(reservationInfo);
      const newTreatment = this.treatmentRepository.create(); //treatmentdto
      await this.treatmentRepository.save(newTreatment);
    } else {
      throw new BadRequestException('예약 상태를 확인해주세요.');
    }
  }

  // 고객의 진료 목록을 조회한다.
  public async getDiagnosis(id: number) {
    const reservationId = await this.reservationRepository.findOneBy({
      id,
    });
    const treatmentResult = await this.treatmentRepository.findOneBy({
      id,
    });
    if (reservationId.id !== treatmentResult.id) {
      throw new BadRequestException('예약id가 일치하지 않습니다.');
    }
    return;
  }

  public async completePayment(id: number, amount: number) {
    const reservationInfo = await this.reservationRepository.findOneBy({
      id,
    });

    const validationAmount = this.validateAmount(amount);
    if (!validationAmount) {
      return validationAmount;
    }

    reservationInfo.amount = amount;
    await this.reservationRepository.save(reservationInfo);
  }

  validateAmount(amount: number) {
    if (amount < 0) {
      throw new BadRequestException('비용이 음수 값입니다.');
    }
    if (amount === undefined) {
      throw new BadRequestException('이런걸 뭐라고하냐....');
    }
    return true;
  }

  async checkIsManager(userId: number) {
    // const order = await this.orderRepository.getOrderByOrderId(orderId);
    if (userId === 2) {
      return true;
    }
  }
}
