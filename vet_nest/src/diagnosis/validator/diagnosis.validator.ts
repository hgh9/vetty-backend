import { BadRequestException } from '@nestjs/common';

export default class ReservationValidator {
  static ReservationListValidate(reservationList, receptionMethod) {
    if (reservationList.length === 0) {
      throw new BadRequestException('존재하지 않는 병원입니다.');
    }
    if (receptionMethod !== 'R') {
      throw new BadRequestException('예약 접수가 아닙니다.');
    }
    return true;
  }

  static ReservationStatusvalidate(reservationStatus) {
    const result = this.checkReservationStatus_cancle(reservationStatus.status);
    return true;
  }

  static checkReservationStatus_cancle(reservationStatus: number) {
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

  static DignosisStatusvalidate(treatmentResult, diagnosisStatus) {
    if (treatmentResult.length < 1 || treatmentResult === undefined) {
      throw new BadRequestException('진료 결과 내용이 없습니다.');
    }
    if (diagnosisStatus.status !== 2) {
      throw new BadRequestException('진료 상태를 확인해주세요.');
    }
    return true;
  }

  static TreatmentStatusvalidate(vetId, treatmentStatus, getDiagnosisList) {
    if (treatmentStatus > 4) {
      throw new BadRequestException('존재하지 않는 진료내역 입니다.');
    }
    if (getDiagnosisList.length === 0) {
      throw new BadRequestException('진료내역을 불러오는데 실패하였습니다.');
    }
    return true;
  }

  static DiagnosisByUser(diagnosisByUser) {
    if (diagnosisByUser.length === 0) {
      throw new BadRequestException('존재하지 않는 사용자입니다.');
    }
    return true;
  }

  static DiagnosisDetailByUser(diagnosisDetail) {
    if (diagnosisDetail.length === 0) {
      throw new BadRequestException('상세내역을 불러오는데 실패하였습니다.');
    }
    return true;
  }
}
