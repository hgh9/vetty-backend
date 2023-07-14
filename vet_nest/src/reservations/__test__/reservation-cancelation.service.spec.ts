import { Test, TestingModule } from '@nestjs/testing';
import { ReservationCancelationService } from '../reservation-cancelation.service';
import { DataSource } from 'typeorm';
import { initializeDataSource } from '../../database/typeorm-maria-testing.module';
import { Reservation, TreatmentStatus } from '../entity/reservation.entity';
import { ReservationReposiotory } from '../repository/reservation-repository';
import { MockReservationRepository } from '../repository/reservation-repository.mock';
import ReservationCancelationValidator from '../validator/reservation-cancelation.validator';
import { ForbiddenException, NotFoundException } from '@nestjs/common';

describe('예약취소 서비스 - ReservationCancelationService', () => {
  let dataSource: DataSource;
  let service: ReservationCancelationService;
  let repository: MockReservationRepository;

  beforeAll(async (): Promise<DataSource> => await initializeDataSource());
  afterAll(async (): Promise<void> => dataSource?.destroy());
  beforeEach(async () => {
    let module: TestingModule = await Test.createTestingModule({
      providers: [
        ReservationCancelationService,
        {
          provide: ReservationReposiotory,
          useClass: MockReservationRepository,
        },
        ReservationCancelationValidator,
      ],
    }).compile();

    service = module.get<ReservationCancelationService>(
      ReservationCancelationService,
    );
    repository = new MockReservationRepository();
    // validator = module.get<ReservationCancelationValidator>(ReservationCancelationValidator);
  });

  describe('예약 도메인 모델', () => {
    it('예약 취소가 되면 status는 TreatmentStatus.RESERVATION_CANCELED여야 한다.', () => {
      const reservation = new Reservation();
      reservation.cancel();
      expect(reservation.status).toEqual(TreatmentStatus.RESERVATION_CANCELED);
    });
  });

  describe('예약취소 정책', () => {
    it('예약 Id에 해당하는 예약 정보가 없을 경우, NotFoundException을 발생 시킨다.', () => {
      try {
        ReservationCancelationValidator.validate(null);
      } catch (e) {
        expect(e.name).toEqual(NotFoundException.name);
        expect(e.message).toEqual('예약정보를 찾을 수 없습니다.');
      }
    });

    it('예약 시간까지 남은 시간이 한 시간 이내인 경우 ForbiddenException을 발생시킨다.', async () => {
      const reservation = await repository.getReservationById(2);
      try {
        ReservationCancelationValidator.validate(reservation);
        throw Error('');
      } catch (e) {
        expect(e.name).toEqual(ForbiddenException.name);
        expect(e.message).toEqual('취소 가능 시간이 아닙니다.');
      }
    });

    it('예약완료 상태가 아닌 경우 ForbiddenException을 발생시킨다.', async () => {
      const reservation = await repository.getReservationById(3);
      try {
        ReservationCancelationValidator.validate(reservation);
        throw Error('');
      } catch (e) {
        expect(e.name).toEqual(ForbiddenException.name);
        expect(e.message).toEqual('취소 가능 상태가 아닙니다.');
      }
    });
  });

  describe('예약 취소 서비스', () => {
    it('예약 취소가 성공하면, 진료 상태가 취소 완료 상태를 반환한다.', async () => {
      const reservationId = 1;
      const canceledReservation = await service.cancelReservation(
        reservationId,
      );
      expect(canceledReservation.status).toEqual(
        TreatmentStatus.RESERVATION_CANCELED,
      );
    });
  });
});
