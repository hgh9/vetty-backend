import { Test, TestingModule } from '@nestjs/testing';
import { ReservationCancelationController } from '../reservation-cancelation.controller';
import {
  ForbiddenException,
  HttpStatus,
  INestApplication,
} from '@nestjs/common';
import * as request from 'supertest';
import { ReservastionsDto } from '../dto/reservations.dto';
import { TreatmentStatus } from '../entity/reservation.entity';

describe('ReservationCancelationController', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({}).compile();

    app = module.createNestApplication();
    await app.init();
  });

  describe('GET /reservation-cancelation/${reservationId} - 예약취소 요청 e2e', () => {

    it('정상적으로 취소된 경우 200을 반환한다.', async () => {
      //Arrange
      const reservationId = 1;
      //Act
      const res = 
        await request('http://localhost:3001')
              .get(`/reservation-cancelation/${reservationId}`);
      //Assert 
      expect(res.status).toBe(HttpStatus.OK);
    });

    it('예약정보가 없으면 404을 반환한다.', async () => {
      //Arrange
      const reservationId = -1;
      //Act
      const res = await request('http://localhost:3001')
        .get(`/reservation-cancelation/${reservationId}`);  
      //Assert
      expect(res.status).toEqual(HttpStatus.NOT_FOUND);
    });

    it('예약시간까지 남은시간이 한시간 이내면 403을 반환한다.', async () => {
      //Arrange
      const reservationId = 2;
      //Act
      const res = await request('http://localhost:3001/')
        .get(`/reservation-cancelation/${reservationId}`);
      //Assert
      expect(res.status).toBe(HttpStatus.FORBIDDEN);
    });

    it('예약상태가 예약완료가 아닌경우 403을 반환한다.', async () => {
      //Arrange
      const reservationId = 3;
      //Act
      const res = await request('http://localhost:3001')
        .get(`/reservation-cancelation/${reservationId}`);
      //Assert
      expect(res.status).toBe(HttpStatus.FORBIDDEN);
    });
  });
});
