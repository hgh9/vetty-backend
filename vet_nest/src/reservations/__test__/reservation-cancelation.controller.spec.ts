import { Test, TestingModule } from '@nestjs/testing';
import { ReservationCancelationController } from '../reservation-cancelation.controller';
import {
  ForbiddenException,
  HttpStatus,
  INestApplication,
} from '@nestjs/common';
import * as request from 'supertest';

describe('ReservationCancelationController', () => {
  let app: INestApplication;
  let controller: ReservationCancelationController;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({}).compile();

    app = module.createNestApplication();
    await app.init();
  });

  describe('예약취소', () => {
    it('정상적으로 예약이 취소되면 취소된 결과 메시지를 받는다.', async () => {
      //Arrange
      const reservationId = 1;

      //Act
      request('http://localhost:3001')
        .get(`/reservation-cancelation?id=${reservationId}`)
        .then((res: request.Response) => {
          //Assert
          expect(res.statusCode).toEqual(HttpStatus.OK);
          expect(res.body.result).toBeTruthy();
          expect(res.body.message).toEqual('예약이 취소되었습니다.');
        });
    });

    it('예약 id에 해당하는 예약정보가 없으면, 404 오류 메시지를 받는다. cancelReservation', async () => {
      //Arrange
      const reservationId = -1;

      //Act
      request('http://localhost:3001')
        .get(`/reservation-cancelation?id=${reservationId}`)
        .then((res: request.Response) => {
          //Assert
          expect(res.statusCode).toEqual(HttpStatus.NOT_FOUND);
          expect(res.body.message).toEqual('예약정보를 찾을 수 없습니다.');
        });
    });

    it('예약시간까지 남은시간이 한시간 미만이면, 실패(403) 에러를 반환한다. - cancelReservation', async () => {
      //Arrange
      const reservationId = 2;

      //Act
      request('http://localhost:3001')
        .get(`/reservation-cancelation?id=${reservationId}`)
        .then((res: request.Response) => {
          //Assert
          expect(res.statusCode).toEqual(HttpStatus.FORBIDDEN);
        });
    });

    it('예약 상태가 예약완료가 아닌 경우 실패(403) 에러를 반환한다. - cancelReservation', async () => {
      //Arrange
      const reservationId = 3;

      //Act
      request('http://localhost:3001')
        .get(`/reservation-cancelation?id=${reservationId}`)
        .then((res: request.Response) => {
          //Assert
          expect(res.statusCode).toEqual(HttpStatus.FORBIDDEN);
          expect(res.body.message).toEqual('예약 취소할 수 없는 상태 입니다.');
        });
    });
  });
});
