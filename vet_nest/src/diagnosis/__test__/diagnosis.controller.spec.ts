import { Test, TestingModule } from '@nestjs/testing';
import {
  ForbiddenException,
  HttpStatus,
  INestApplication,
} from '@nestjs/common';
import * as request from 'supertest';
import exp from 'constants';

describe('DisgnosisController', () => {
  let app: INestApplication;
  let disgnosisController;

  beforeAll(async () => {
    //앱모듈을 실행
    const module: TestingModule = await Test.createTestingModule({}).compile();
    app = module.createNestApplication();
    await app.init();
  });

  describe('예약조회', () => {
    it('예약정보가 전체 목록을 불러온다.', async () => {
      const vetId = 1;
      request('http://localhost:3001/diagnosis/')
        .get(`${vetId}/reservation`)
        .then((res: request.Response) => {
          expect(res.status).toBe(HttpStatus.OK);
        });
    });

    it('병원 정보가 잘못되었을 때', async () => {
      const vetId = 2;
      request('http://localhost:3001/diagnosis/')
        .get(`${vetId}/reservation`)
        .then((res: request.Response) => {
          expect(res.status).toBe(HttpStatus.EXPECTATION_FAILED);
        });
    });
  });

  describe('예약에서 진료중으로 상태 변경', () => {
    it('진료중 상태로 변경된 경우. - 성공', async () => {
      const reservationId = 1;
      request('http://localhost:3001/diagnosis/')
        .put(`${reservationId}/status`)
        .then((res: request.Response) => {
          expect(res.status).toBe(HttpStatus.OK); // 성공케이스 객체(엔티티값)가 반환 되었을 때
          //실패케이스
          // 상태값이 동일할 때 -> 새로바뀐값이랑 기존값이랑 같을 때
          // 아이디값이 일치하지 않을 경우
          // paramr값이 정상적으로 들어오지 않을 경우
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

      // it('예약정보가 조회되지 않는다.', async () => {
      //   request('http://localhost:3001')
      //     .put('check/:id')
      //     .then((res: request.Response) => {
      //       expect(res.statusCode).toBe(404);
      //       expect(res.body.param).not.toBeNull();
      //     });
      // });

      // it('관리지만 요청 가능하다.', async () => {
      //   request('http://localhost:3001')
      //     .put('check/:id')
      //     .then((res: request.Response) => {
      //       expect(res.statusCode).toBe(200);
      //     });
      // });
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
