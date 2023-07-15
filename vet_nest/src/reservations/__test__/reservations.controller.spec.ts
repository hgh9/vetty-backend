import { Test, TestingModule } from '@nestjs/testing';
import { ReservationsController } from '../reservations.controller';
import * as request from 'supertest';
import { HttpStatus, INestApplication } from '@nestjs/common';
import {
  DignosisCategory,
  TreatmentStatus,
} from '../entity/reservation.entity';
import {
  ReservastionsDto,
  ReservationProcessDto,
} from '../dto/reservations.dto';
import {
  PetCategories,
  PetGender,
  PetVaccinatedInfo,
} from '../../pets/entity/pet.entity';
import { ReservastionsDto } from '../dto/reservations.dto';

import * as moment from 'moment';
import { SetTimeSlotCommand } from '../dto/timeslot.dto';
import { PayMethod, PaymentStatus } from '../../payments/dto/payment.dto';

describe('ReservationsController', () => {
  let controller: ReservationsController;
  let app: INestApplication;
  const mockData: ReservationProcessDto = {
    id: 1,
    firstVisit: DignosisCategory.NORMAL,
    status: TreatmentStatus.RESERVATION_COMPLETED,
    // updatedAt: new Date(Date.now()),
    reservedAt: new Date(Date.now()),
    petId: '263df66a-c1e0-4ad3-94e7-bf8236ec3f09',
    userId: 1,
    vetId: 1,
    payments: {
      appId: '263df66a-c1e0-4ad3-94e7-bf8236ec3f09',
      amount: 30000,
      status: PaymentStatus.PENDING,
      payMethod: PayMethod.CARD,
      createdAt: new Date(Date.now()),
      reservationId: 1,
    },
    timeSlot: {
      time: 13,
      startDate: new Date(Date.now()),
      startTime: '14:00:00',
      endTime: '15:00:00',
      vetId: 1,
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({}).compile();

    app = module.createNestApplication();
    await app.init();
  });

  describe('슬롯 체킹(예약가능한 날짜 확인)', () => {
    it('checking date ', async () => {
      await request('http://localhost:3001')
        .get('/reservations/available/time')
        .query({ startDate: '2023-01-01' })
        .then((res: request.Response) => {
          expect(res.statusCode).toEqual(HttpStatus.OK);
        });
    });
  });

  describe('슬롯 저장', () => {
    const saveSlotTIme = {
      // startDate: new Date(moment('2023-01-01').format('YYYY-MM-DD')),
      startDate: '2023-01-01',
      startTime: '13:00:00',
      endTime: '14:00:00',
      time: 13,
      vetId: 1,
    };
    it('set timeslot date ', async () => {
      await request('http://localhost:3001')
        .post('/reservations/set/time')
        .send(saveSlotTIme)
        .then((res: request.Response) => {
          expect(res.statusCode).toEqual(HttpStatus.OK);
        });
    });
  });

  describe('예약 저장', () => {
    it('/reservations, 예약저장 ', async () => {
      // pet id ,reservation date, hospital id,  user id , reservation info
      const res = await request('http://localhost:3001')
        .post(`/reservations`)
        .send(mockData)
        .then((res: request.Response) => {
          //Assert
          expect(res.statusCode).toEqual(HttpStatus.OK);
          expect(res.body.result).toBeTruthy();
          expect(res.body.result).toBeCalled();
          expect(res.body.message).toEqual('예약이 완료되었습니다.');
        });
    });
  });

  describe('GET /reservations - 예약정보 조회', () => {
    it('예약정보 정보 조회할 경우 200을 반환한다.', async () => {
      //Arrange
      const customerId = '1';
      const startDate = moment().add(-1, 'months').format('YYYY-MM-DD');
      const endDate = moment().format('YYYY-MM-DD');
      const param = `startDate=${startDate}&endDate=${endDate}`;
      // Act
      const res = await request('http://localhost:3001').get(
        `/reservations?${param}`,
      );
      // Assert
      expect(res.status).toBe(HttpStatus.OK);
    });

    it('조회 최소 기한이 5년 이전인 경우 최대 5년까지만 조회가 가능합니다 오류 메시지를 반환한다.', async () => {
      //Arrange
      const startDate = moment()
        .add(-5, 'years')
        .add(-1, 'days')
        .format('YYYY-MM-DD');
      const endDate = moment().add(-5, 'years').format('YYYY-MM-DD');
      const param = `startDate=${startDate}&endDate=${endDate}`;

      //Act
      const res = await request('http://localhost:3001').get(
        `/reservations?${param}`,
      );

      //Assert
      expect(res.status).toBeGreaterThan(HttpStatus.BAD_REQUEST);
      expect(res.body.error.length).toBeGreaterThan(0);
      expect(res.body.error).toContainEqual({
        key: 'startDate',
        error: '최대 5년 이전까지만 조회가 가능합니다.',
      });
    });

    it('조회 기간이 1년을 초과하면 400을 반환한다.', async () => {
      //Arrange
      const startDate = moment().add(-366, 'days').format('YYYY-MM-DD');
      const endDate = moment().format('YYYY-MM-DD');
      const param = `startDate=${startDate}&endDate=${endDate}`;

      //Act
      const res = await request('http://localhost:3001').get(
        `/reservations?${param}`,
      );

      //Assert
      expect(res.status).toBeGreaterThan(HttpStatus.BAD_REQUEST);
      expect(res.body.error.length).toBeGreaterThan(0);
      expect(res.body.error).toContainEqual({
        key: 'startDate',
        error: '조회 범위는 최대 1년 입니다.',
      });
    });
  });
});
