import { Test, TestingModule } from '@nestjs/testing';
import {
  ForbiddenException,
  HttpStatus,
  INestApplication,
} from '@nestjs/common';
import * as request from 'supertest';
import { CheckController } from '../check.controller';
import exp from 'constants';

describe('CheckController', () => {
  let app: INestApplication;

  beforeAll(async () => {
    //앱모듈을 실행
    const module: TestingModule = await Test.createTestingModule({}).compile();

    app = module.createNestApplication();
    await app.init();
  });

  describe('예약조회', () => {
    it('예약정보가 전체 목록을 불러온다.', () => {
      //테스트가 성공하는 상황
      request('http://localhost:3001')
        .get('/check')
        .then((res: request.Response) => {
          expect(res.body.result).toEqual([]); // 성공케이스 배열값이 return되었을 때
          expect(res.body.result).toBeUndefined(); // 실패케이스 값이 undefined일 경우(예약목록을 불러오지 못했을경우)
          //404에러가 뜰 경우(서버 연결오류)
          //어드민이 아닐 경우 -> user값 안에서 어드민인지 확인
        });
    });
  });
});

describe('예약상태 변경', () => {
  it('예약 상태 변경이 정상 반영된다.', async () => {
    request('http://localhost:3001')
      .put('check/:id')
      .then((res: request.Response) => {
        console.log('res', res);
        expect(res.statusCode).toEqual({}); // 성공케이스 객체(엔티티값)가 반환 되었을 때
        //실패케이스
        // 상태값이 동일할 때 -> 새로바뀐값이랑 기존값이랑 같을 때
        // 아이디값이 일치하지 않을 경우
        // paramr값이 정상적으로 들어오지 않을 경우
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
