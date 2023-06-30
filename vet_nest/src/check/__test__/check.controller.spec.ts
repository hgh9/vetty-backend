import { Test, TestingModule } from '@nestjs/testing';
import {
  ForbiddenException,
  HttpStatus,
  INestApplication,
} from '@nestjs/common';
import * as request from 'supertest';
import { CheckController } from '../check.controller';

describe('CheckController', () => {
  let app: INestApplication;
  // let controller: CheckController;

  beforeAll(async () => {
    //앱모듈을 실행
    const module: TestingModule = await Test.createTestingModule({}).compile();

    app = module.createNestApplication();
    await app.init();
  });

  describe('예약조회', () => {
    it('예약정보가 전체 조회된다.', async () => {
      request('http://localhost:3001')
        .get('/check')
        .then((res: request.Response) => {
          expect(res.statusCode).toBe(200);
          expect(res.body.result).not.toBeUndefined(); //예약정보가 없을 경우도 true
          expect(res.body.message).toEqual('예약조회가 완료되었습니다.');
        });
    });
  });
});

describe('예약상태 변경', () => {
  it('예약 상태 변경 정상 반영된다.', async () => {
    request('http://localhost:3001')
      .put('check/:id')
      .then((res: request.Response) => {
        console.log('res', res);
        expect(res.statusCode).toBe(201);
        expect(res.body.message).toEqual('상태변경이 완료 되었습니다.');
      });
  });

  it('예약정보가 조회되지 않는다.', async () => {
    request('http://localhost:3001')
      .put('check/:id')
      .then((res: request.Response) => {
        expect(res.statusCode).toBe(404);
        expect(res.body.param).not.toBeNull();
        //파람스형태가 맞는지
      });
  });

  it('관리지만 요청 가능하다.', async () => {
    request('http://localhost:3001')
      .put('check/:id')
      .then((res: request.Response) => {
        expect(res.statusCode).toBe(200);
        //파람스형태가 맞는지
      });
  });
});
