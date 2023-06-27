import { Test, TestingModule } from '@nestjs/testing';
import { ReservationCancelationController } from '../reservation-cancelation.controller';
import { TypeOrmModule, getDataSourceName, getDataSourcePrefix, getDataSourceToken, getRepositoryToken } from '@nestjs/typeorm';
import { ForbiddenException, HttpStatus, INestApplication, InternalServerErrorException } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { ConfigModule } from '@nestjs/config';
import * as request from 'supertest';
import { ReservationsModule } from '../reservations.module';
import config, { databaseProviders } from '../../../config/config';
import { ReservationCancelationService } from '../reservation-cancelation.service';
import { ReservationService } from '../reservations.service';
import { DataSource, Repository } from 'typeorm';
import { Reservation } from '../entity/reservation.entity';
import { ReservationsController } from '../reservations.controller';


describe('ReservationCancelationController', () => {
  let app: INestApplication;
  let controller: ReservationCancelationController;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({}).compile();

    app = module.createNestApplication();
    await app.init();

  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('예약취소', () => {

    it('예약 취소를 요청하고 결과를 반환한다.', async () => {
      //Arrange
      const reservationId = -2;
 
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

    it('예약id에 해당하는 예약정보를 찾을 수 없는 경우 실패(400)에러를 반환한다. - cancelReservation', async () => {
      //Arrange
      const reservationId = -2;

      //Act 
      request('http://localhost:3001')
        .get(`/reservation-cancelation?id=${reservationId}`)
        .then((res: request.Response) => {
          //Assert 
          expect(res.statusCode).toEqual(HttpStatus.NOT_FOUND)
        });
    });

    it('예약 시간이 한 시간 이내로 남은 경우 실패(403) 에러를 반환한다. - cancelReservation', async () => {
      //Arrange 
      const reservationId = 1;

      //Act 
      const resultTask = controller.cancelReservation(reservationId);

      //Assert 
      await expect(resultTask)
        .toThrowError(new ForbiddenException('예약 취소는 한 시간 이상 남아 있을 경우에만 취소가 가능합니다.'));
    });
  });
});
