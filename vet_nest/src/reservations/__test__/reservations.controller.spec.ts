import { Test, TestingModule } from '@nestjs/testing';
import { ReservationsController } from '../reservations.controller';
import * as request from 'supertest';
import { HttpStatus, INestApplication, Body } from '@nestjs/common';
import { ReservationService } from '../reservations.service';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import config from '../../../config/config';
import { Reservation, ReservationStatus } from '../entity/reservation.entity';
import { Payment } from '../entity/payment.entity';
import { ReservastionsDto } from '../dto/reservations.dto';

describe('ReservationsController', () => {
  let controller: ReservationsController;
  let app: INestApplication;
  let mockData: ReservastionsDto = {
    id: 1,
    vetName: 'hah',
    vetHahah: 'diasm2@gmail.com',
    vetPopo: 'popo',
    status: ReservationStatus.COMPLETED,
    views: 1,
    isPublished: true,
    updatedAt: new Date(Date.now()),
    reservedAt: new Date(Date.now()),
    // payments: [{id: appId, method}],
  };

  class MockUserRepository {
    #data = [
      {
        id: 1,
        vetName: 'hah',
        vetHahah: 'diasm2@gmail.com',
        vetPopo: 'popo',
        views: 1,
        isPublished: true,
        status: 'haha',
      },
    ];
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({}).compile();

    // const module: TestingModule = await Test.createTestingModule({}).compile();

    app = module.createNestApplication();
    await app.init();
    // controller = module.get<ReservationsController>(ReservationsController);
  });

  describe('예약 저장', () => {
    // 이미  pet, hospital, 진료과목, 진료정보 선택이 되어 있다.
    // 프론트에서 내용들이 넘어오니까

    // pet 저장 api 수정 삭제 불러오기
    // hospital 저장 수정 삭제 불러오기

    it('/reservations, 예약저장 ', async () => {
      //pet id ,reservation date, hospital id,  user id , reservation info

      request('http://localhost:3001')
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

  it('예약 조회', () => {
    expect(controller).toBeDefined();
  });

  // 예약건들의 조회
});
