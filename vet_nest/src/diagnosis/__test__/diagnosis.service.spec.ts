import { Test, TestingModule } from '@nestjs/testing';

import { BadRequestException } from '@nestjs/common';
import { DiagnosisService } from '../diagnosis.service';
import { initializeDataSource } from '../../database/typeorm-maria-testing.module';

describe('DiagnosisService', () => {
  let service: DiagnosisService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: 'DATA_SOURCE',
          useFactory: () => initializeDataSource(),
        },
        DiagnosisService,
      ],
    }).compile();

    service = module.get<DiagnosisService>(DiagnosisService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // describe('예약을 조회한다.', () => {
  //   it('예약 완료 상태 목록을 가져온다.', () => {
  //     expect(service.getAllReservations).toEqual([
  //       {
  //         id: 1,
  //         receptionMethod: 'R',
  //         status: 1,
  //         reservedAt: '2023-07-08T00:00:00.000Z',
  //         vetId: 1,
  //         petId: '263df66a-c1e0-4ad3-94e7-bf8236ec3f09',
  //         userId: 1,
  //         treatmentStatus: 1,
  //         amount: '0',
  //         createdAt: '2023-07-08T00:00:00.000Z',
  //         updatedAt: '2023-07-08T03:24:53.988Z',
  //       },
  //     ]);
  //   });
  //   it('예약정보가 없을 경우', async () => {
  //     const result = await service.updateReservaionStatus;
  //     expect(result).rejects.toThrowError(
  //       new BadRequestException('예약정보가 존재하지 않습니다.'),
  //     );
  //   });
  // });

  describe('예약 상태를 변경 한다.', () => {
    // 진료를 완료한다랑 같이 쓸 수 있을 거 같은데
    it('진료중으로 상태 변경 완료', async () => {
      const id = 1;
      const result = await service.updateReservaionStatus(id);
      expect(result).toBe(true);
    });

    it('상태값이 진료 중이 경우', async () => {
      const id = 2;
      expect(service.updateReservaionStatus(id)).rejects.toThrowError(
        new BadRequestException('상태값을 확인해주세요'),
      );
    });
    it('상태값이 진료 완료일 경우 ', async () => {
      const id = 3;
      expect(service.updateReservaionStatus(id)).rejects.toThrowError(
        new BadRequestException('상태값을 확인해주세요'),
      );
    });

    it('관리자(직원)만 접근 가능하다.', () => {
      const userId = 2;
      expect(service.checkIsManager(userId)).toBe(true);
    });
  });

  // describe('진료 내용과 정보를 조회한다.', () => {
  //   it('진료 내용과 정보를 가져온다.', () => {
  //     expect(service.getAllDiagnosis).toEqual({
  //       reservationId: 1,
  //       treatmentResult: 'will be okay',
  //     });
  //   });

  //   it('진료시간이 오늘이 아닐 경우', () => {
  //     expect(service.getDiagnosis).toBeFalsy;
  //   });
  // });

  describe('진료비를 결제 한다.', () => {
    it('진료비 결제 완료', () => {
      const id = 1;
      const amount = -1;
      expect(service.completePayment(id)).rejects.toThrowError(
        new BadRequestException('금액을 다시 확인해주세요.'),
      );
    });
  });
});
