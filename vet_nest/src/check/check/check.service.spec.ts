import { Test, TestingModule } from '@nestjs/testing';
import { CheckService } from './check.service';
import { BadRequestException } from '@nestjs/common';

describe('CheckService', () => {
  let service: CheckService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CheckService],
    }).compile();

    service = module.get<CheckService>(CheckService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('예약을 조회한다.', () => {
    it('예약 완료 상태 목록을 가져온다.', () => {
      expect(service.getAllReservations).toEqual([
        { id: 1, status: '예약완료', vetId: '1' },
        { id: 2, status: '예약완료', vetId: '1' },
        //   { id: 3, status: '예약취소' },
      ]);
    });
  }); // 예약값의 param validation이 필요한지?

  describe('예약 상태를 변경 한다.', () => {
    // 진료를 완료한다랑 같이 쓸 수 있을 거 같은데
    it('진료중으로 상태 변경 완료', () => {
      expect(service.updateReservaionStatus).toEqual({
        id: 1,
        status: '진료중',
        vetId: '1',
      });
    });

    it('상태값이 예약완료가 아닐 경우', () => {
      expect(service.updateReservaionStatus).rejects.toThrowError(
        new BadRequestException('상태값을 확인해주세요'),
      );
    });

    it('관리자(직원)의 요청이 아닐 경우', () => {
      expect(service.updateReservaionStatus).toEqual({
        id: 1,
        status: '진료중',
        vetId: '1',
        isAdmin: true,
      });
    });
  });

  describe('진료 내용과 정보를 조회한다.', () => {
    it('진료 내용과 정보를 가져온다.', () => {
      expect(service.getDiagnosis).toEqual({
        reservationId: 1,
        treatmentResult: 'will be okay',
      });
    });

    it('진료시간이 오늘이 아닐 경우', () => {
      expect(service.getDiagnosis).toBeFalsy;
    });
  });

  describe('진료비를 결제 한다.', () => {
    it('진료비 결제 완료', () => {
      expect(service.completePayment).toBeTruthy;
    });
    it('결제 비용이 음수일 경우', () => {
      expect(service.completePayment(1, -1000)).toBeFalsy;
    });
  });
});
