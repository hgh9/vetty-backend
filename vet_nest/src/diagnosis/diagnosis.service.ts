import { User } from '../users/entity/users.entity';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { TreatmentResult } from './entity/TreatmentResult.entity';
import { Reservation } from '../reservations/entity/reservation.entity';
import { ReservationReposiotory } from '../reservations/repository/reservation-repository';
import { DiagnosisRepository } from './repository/diagnosis-repository';
import ReservationValidator from './validator/diagnosis.validator';
import { TreatmentDto } from './dto/TreatmentResult.dto';
@Injectable()
export class DiagnosisService {
  private treatmentRepository: Repository<TreatmentResult>;
  constructor(
    @Inject('DATA_SOURCE')
    private readonly dataSource: DataSource,
    private readonly reservationRepository: ReservationReposiotory,
    private readonly diagnosisRepository: DiagnosisRepository,
  ) {
    this.treatmentRepository = this.dataSource.getRepository(TreatmentResult);
  }

  public async getAllReservation(vetId: number, receptionMethod: string) {
    const reservationList =
      await this.reservationRepository.getAllReservationByVetId(
        vetId,
        receptionMethod,
      );
    const isValid = await ReservationValidator.ReservationListValidate(
      reservationList,
      receptionMethod,
    );
    try {
      if (isValid) {
        return reservationList;
      }
    } catch (e) {
      //모지?
      throw e;
    }
  }

  // 예약 상태를 진료중으로 변경한다.
  public async updateReservaionStatus(reservationId: number) {
    // 진료중으로 변경
    const reservationStatus =
      await this.reservationRepository.updateReservaionStatusById(
        reservationId,
      );

    const isValid = await ReservationValidator.ReservationStatusvalidate(
      reservationStatus,
    );
    try {
      if (isValid) {
        reservationStatus.status = 2;
        reservationStatus.updatedAt = new Date();
        await this.reservationRepository.save(reservationStatus);
        return reservationStatus;
      }
    } catch (e) {
      throw e;
    }
  }

  // 진료를 완료 한다.
  public async completeDignosis(
    reservationId: number,
    treatmentResult: string,
  ) {
    const diagnosisStatus =
      await this.diagnosisRepository.updateDignosisStatusById(reservationId);

    const isValid = await ReservationValidator.DignosisStatusvalidate(
      treatmentResult,
      diagnosisStatus,
    );
    try {
      if (isValid) {
        diagnosisStatus.status = 3;
        diagnosisStatus.updatedAt = new Date();
        await this.reservationRepository.save(diagnosisStatus);
        await this.treatmentRepository.save({
          id: reservationId,
          treatmentResult: treatmentResult,
        });
        return diagnosisStatus;
      }
    } catch (e) {
      throw e;
    }
  }

  //카테고리값으로 넘어와서 카테고리별 조회
  public async getDiagnosisList(vetId: number, treatmentStatus: number) {
    const getDiagnosisList =
      await this.diagnosisRepository.getDiagnosisListByVetId(
        vetId,
        treatmentStatus,
      );
    console.log(getDiagnosisList);
    const isValid = await ReservationValidator.TreatmentStatusvalidate(
      vetId,
      treatmentStatus,
      getDiagnosisList,
    );

    try {
      if (isValid) {
        return getDiagnosisList;
      }
    } catch (e) {
      e;
    }
  }

  // 결제완료
  public async completePayment(id: number) {
    const reservationInfo = await this.reservationRepository.findOneBy({
      id,
    });

    const validationAmount = this.validateAmount(reservationInfo.amount);
    if (!validationAmount) {
      return validationAmount;
    }

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

  public async getDiagnosisByUser(userId: number) {
    const diagnosisByUser =
      await this.diagnosisRepository.getDiagnosisListByUser(userId);
    const isValid = await ReservationValidator.DiagnosisByUser(diagnosisByUser);

    try {
      if (isValid) {
        return diagnosisByUser;
      }
    } catch (e) {
      e;
    }
  }

  public async getDiagnosisDetail(
    userId: number,
    reservationId: number,
    treatmentStatus: number,
  ) {
    const diagnosisDetail =
      await this.diagnosisRepository.getDiagnosisDetailByUser(
        userId,
        treatmentStatus,
      );

    const isValid = await ReservationValidator.DiagnosisDetailByUser(
      diagnosisDetail,
    );

    try {
      if (isValid) {
        return diagnosisDetail;
      }
    } catch (e) {
      e;
    }

    return diagnosisDetail;
  }
}
