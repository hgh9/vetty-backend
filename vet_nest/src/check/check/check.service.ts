import { Reservation } from '@/reservations/entity/reservation.entity';
import { User } from '@/users/entity/users.entity';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { TreatmentResult } from '../entity/TreatmentResult.entity';

@Injectable()
export class CheckService {
  private reservationRepository: Repository<Reservation>;
  private userRepository: Repository<User>;
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
    // 값을 불러오지 못했을 경우의 에러처리 필요
    return getAllReservation;
  }

  public async updateReservaionStatus(id, status, userId) {
    // 아에 Dto 넘기면 값을 다 안써도 값을 불러올 수 있다
    const userInfo = await this.userRepository.findOneBy({
      id: userId,
    });
    const reservationStatus = await this.reservationRepository.findOneBy({
      id: id,
    });
    reservationStatus.status = status;
    reservationStatus.updatedAt = new Date();
    await this.reservationRepository.save(reservationStatus);

    if (reservationStatus.status !== 1) {
      throw new BadRequestException('존재하지 않는 메뉴입니다.');
    }
    if (userInfo.level !== 1) {
      throw new BadRequestException('접근 권한이 없습니다.');
    }
    return reservationStatus;
  }

  public async getDiagnosis(id) {
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

  public async completePayment(id, expense) {
    const reservationId = await this.reservationRepository.findOneBy({
      id,
    });
    // 예약정보에서 아이디가져와서 값에 맞게 결제완료 값을 데이터 베이스에 수정해준다.
    return;
  }
  public async completeDiagnosis(id) {
    const reservationId = await this.reservationRepository.findOneBy({
      id,
    });
    //진료 내용과 그에 맞는 금액,시스템 수정일시,진료완료도 새롭게 등록

    return;
  }
}
