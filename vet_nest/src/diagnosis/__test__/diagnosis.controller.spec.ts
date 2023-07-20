import { Test, TestingModule } from '@nestjs/testing';
import {
  ForbiddenException,
  HttpStatus,
  INestApplication,
} from '@nestjs/common';
import * as request from 'supertest';
import exp from 'constants';
import { ReceptionMethod } from '../../reservations/entity/reservation.entity';

describe('DisgnosisController', () => {
  let app: INestApplication;
  let disgnosisController;

  beforeAll(async () => {
    //앱모듈을 실행
    const module: TestingModule = await Test.createTestingModule({}).compile();
    app = module.createNestApplication();
    await app.init();
  });

  describe('GET /diagnosis/${vetId}/reservation - 예약목록 조회', () => {
    it('정상적으로 조회된 경우 200을 반환한다. ', async () => {
      const vetId = 1;
      request('http://localhost:3001')
        .get(`/diagnosis/${vetId}/reservations`)
        .then((res: request.Response) => {
          expect(res.status).toBe(HttpStatus.OK);
        });
    });

    it('예약 목록이 없을 경우 400을 반환한다. ', async () => {
      const vetId = 1;
      request('http://localhost:3001')
        .get(`/diagnosis/${vetId}/reservations`)
        .then((res: request.Response) => {
          expect(res.status).toBe(400);
        });
    });

    it('접수 방식이 예약이 아닌 경우 400을 반환한다.', async () => {
      const vetId = 1;
      request('http://localhost:3001')
        .get(`/diagnosis/${vetId}/reservation`)
        .send({ receptionMethod: ReceptionMethod.ON_SITE })
        .then((res: request.Response) => {
          expect(res.status).toBe(HttpStatus.EXPECTATION_FAILED);
        });
    });
  });

  describe('PUT /diagnosis/${reservationId}/status - 진료중으로 상태변경', () => {
    it('진료중 상태로 변경된 경우. - 성공', async () => {
      const reservationId = 1;
      request('http://localhost:3001')
        .put(`/diagnosis/${reservationId}`)
        .then((res: request.Response) => {
          expect(res.status).toBe(HttpStatus.OK);
        });
    });
    it('변경 전 상태가 예약중이 아닐 경우 - 실패', async () => {
      //서비스에서할까?
      const reservationId = 1;
      request('http://localhost:3001/diagnosis/')
        .put(`${reservationId}/status`)
        .then((res: request.Response) => {
          expect(res.status).toBe(HttpStatus.EXPECTATION_FAILED);
        });
    });
  });

  describe('진료중에서 진료완료로 상태 변경', () => {
    it('진료 완료 상태로 정상 반영된 경우 - 성공', async () => {
      const reservationId = 1;
      request('http://localhost:3001/diagnosis/')
        .post(`${reservationId}/status`)
        .send({ treatmentResult: 'test' })
        .then((res: request.Response) => {
          expect(res.status).toBe(HttpStatus.OK);
        });
    });
    it('진료 결과 내용이 작성되지 않은 경우 - 실패', async () => {
      const reservationId = 1;
      const treatmentResult = '';
      request('http://localhost:3001/diagnosis/')
        .post(`${reservationId}/status`)
        .send({ treatmentResult })
        .then((res: request.Response) => {
          expect(res.status).toBe(HttpStatus.EXPECTATION_FAILED);
        });
    });
  });

  describe('병원의 진료목록 조회', () => {
    it('진료목록 조회 - 성공', () => {
      const vetId = 1;
      request('http://localhost:3001/diagnosis/')
        .get(`${vetId}/vetlist`)
        .then((res: request.Response) => {
          expect(res.status).toBe(HttpStatus.OK);
        });
    });
    it('존재하지 않는 진료일 경우 - 실패', () => {
      const vetId = 1;
      const treatmentStatus = 5;
      request('http://localhost:3001/diagnosis/')
        .get(`${vetId}/vetlist`)
        .send({ treatmentStatus })
        .then((res: request.Response) => {
          expect(res.status).toBe(HttpStatus.EXPECTATION_FAILED);
        });
    });
    it('진료내역을 불러오지 못한 경우 - 실패', () => {
      const vetId = 1;
      request('http://localhost:3001/diagnosis/')
        .get(`${vetId}/vetlist`)
        .then((res: request.Response) => {
          expect(res.status).toBe(HttpStatus.EXPECTATION_FAILED);
        });
    });
  });

  describe('고객의 진료목록 조회', () => {
    it('고객의 진료 목록 조회 - 성공', () => {
      const userId = 1;
      request('http://localhost:3001/diagnosis/')
        .get(`${userId}/vetlist`)
        .then((res: request.Response) => {
          expect(res.status).toBe(HttpStatus.OK);
        });
    });
    it('고객의 정보가 존재하지 않을 경우 - 성공', () => {
      const userId = 7;
      request('http://localhost:3001/diagnosis/')
        .get(`${userId}/vetlist`)
        .then((res: request.Response) => {
          expect(res.status).toBe(HttpStatus.EXPECTATION_FAILED);
        });
    });
  });

  describe('고객의 진료목록 상세 조회', () => {
    it('고객의 진료 목록 조회 - 성공', () => {
      const userId = 1;
      const reservationid = 1;
      const treatmentStatus = 1;
      request('http://localhost:3001/diagnosis/')
        .get(`${userId}/vetlist/detail`)
        .send({ reservationid, treatmentStatus })
        .then((res: request.Response) => {
          expect(res.status).toBe(HttpStatus.OK);
        });
    });
    it('고객의 정보가 존재하지 않을 경우 - 성공', () => {
      const userId = 1;
      request('http://localhost:3001/diagnosis/')
        .get(`${userId}/vetlist/detail`)
        .then((res: request.Response) => {
          expect(res.status).toBe(HttpStatus.EXPECTATION_FAILED);
        });
    });
  });
});
