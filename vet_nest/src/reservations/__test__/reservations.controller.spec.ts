import { Test, TestingModule } from '@nestjs/testing';
import { ReservationsController } from '../reservations.controller';
import * as request from 'supertest';
import { HttpStatus, INestApplication } from '@nestjs/common';
import {
  DignosisCategory,
  TreatmentStatus,
} from '../entity/reservation.entity';
import { ReservastionsDto } from '../dto/reservations.dto';
import {
  PetCategories,
  PetGender,
  PetVaccinatedInfo,
} from '../../pets/entity/pet.entity';
import moment from 'moment';

describe('ReservationsController', () => {
  let controller: ReservationsController;
  let app: INestApplication;
  const mockData: ReservastionsDto = {
    id: 1,
    firstVisit: DignosisCategory.NORMAL,
    status: TreatmentStatus.RESERVATION_COMPLETED,
    updatedAt: new Date(Date.now()),
    reservedAt: new Date(Date.now()),
    paymentId: 1,
    petId: 1,
    userId: 1,
    vetId: 3,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({}).compile();

    app = module.createNestApplication();
    await app.init();
  });

  describe('예약 저장', () => {
    it('/reservations, 예약저장 ', async () => {
      //pet id ,reservation date, hospital id,  user id , reservation info

      // request('http://localhost:3001')
      //   .post(`/reservations`)
      //   .send(mockData)
      //   .then((res: request.Response) => {
      //     //Assert
      //     expect(res.statusCode).toEqual(HttpStatus.OK);
      //     expect(res.body.result).toBeTruthy();
      //     expect(res.body.result).toBeCalled();
      //     expect(res.body.message).toEqual('예약이 완료되었습니다.');
      //   });
    });
  });

  describe('GET /reservations - 예약정보 조회', () => {
    it('예약정보 정보 조회할 경우 200을 반환한다.', async () => {
      //Arrange
      const customerId = '1';
      const startDate = '2023-06-19';
      const endDate = '2023-06-30';
      const param = `customerId=${customerId}&startDate=${startDate}&endDate=${endDate}`;

      // Act
      const res = 
        await request('http://localhost:3001')
              .get(`/reservations?${param}`);
      // Assert  
      expect(res.status).toBe(HttpStatus.OK);
    });

    it('조회 최소 기한이 5년 이전인 경우 400을 반환한다.', async () => {
      const today = new Date();
      const startDate = `${today.getFullYear()-5}-${today.getMonth()+1}-${today.getDay()}`;
      const endDate = startDate;
      const param = `startDate=${startDate}&endDate=${endDate}`;

      const res = 
        await request('http://localhost:3001')
              .get(`/reservations?${param}`);

      expect(res.status).toBe(HttpStatus.BAD_REQUEST);
    })
  });

  // 예약건들의 조회
});
