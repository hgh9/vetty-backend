import { Test, TestingModule } from '@nestjs/testing';
import { ReservationsController } from '../reservations.controller';
import * as request from 'supertest';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { ReservationService } from '../reservations.service';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import config from '../../../config/config';
import { Reservation } from '../entity/reservation.entity';
import { Payment } from '../entity/payment.entity';

describe('ReservationsController', () => {
  let controller: ReservationsController;
  let app: INestApplication;

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
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(config().testDbConfig)],
      controllers: [ReservationsController],
      providers: [
        ReservationService,
        {
          provide: getRepositoryToken(Reservation),
          useClass: MockUserRepository,
        },
        {
          provide: getRepositoryToken(Payment),
          useClass: MockUserRepository,
        },
      ],
    }).compile();

    // const module: TestingModule = await Test.createTestingModule({}).compile();

    app = module.createNestApplication();
    await app.init();
    // controller = module.get<ReservationsController>(ReservationsController);
  });

  describe('예약 저장', () => {
    it('/reservations 예약저장 ', async () => {
      //Act
      request('http://localhost:3001')
        .post(`/reservation`)
        .then((res: request.Response) => {
          //Assert
          expect(res.statusCode).toEqual(HttpStatus.OK);
          expect(res.body.result).toBeTruthy();
          expect(res.body.message).toEqual('예약이 완료 되었습니다.');
        });
    });
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // 예약건들의 조회
});
