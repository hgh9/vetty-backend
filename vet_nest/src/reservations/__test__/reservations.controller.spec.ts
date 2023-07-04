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

  it('예약 조회', () => {
    // expect(controller).toBeDefined();
  });

  // 예약건들의 조회
});
