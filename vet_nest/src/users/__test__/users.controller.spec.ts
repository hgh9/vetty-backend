import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../users.controller';
import { ForbiddenException, HttpStatus, INestApplication } from "@nestjs/common";
import * as request from 'supertest';
import { JwtService } from '@nestjs/jwt';

describe('UserController', () => {
  let app: INestApplication;
  let jwtService: JwtService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JwtService
      ]
    }).compile();

    app = module.createNestApplication();
    await app.init();
  })

  test('정상적으로 회원가입 성공하면 결과 메시지를 받는다', async () => {
    const createUserDto = {
      email: 'honggildong@gmail.com',
      userName: '하영',
      password: 'qwer1234',
      phoneNumber: '01012345678',
    };
    const createdUser = {
      id: 1,
      email: 'honggildong@gmail.com',
      userName: '하영',
      password: 'qwer1234',
      phoneNumber: '01012345678',
    };

    request('http://localhost:3001')
      .post(`/signup`)
      .send(createUserDto)
      .then(res => {
        expect(res.statusCode).toEqual(HttpStatus.OK);
        expect(res.body.result).toEqual(createdUser);
        expect(res.body.message).toEqual('회원가입 완료');
      });
  });

  test('잘못된 회원가입 정보를 입력하면, 입력값 오류 메시지를 받는다.', async () => {
    const createUserDto = {
      email: null,
      userName: '하영',
      password: 'qwer1234',
      phoneNumber: '01012345678',
    };

    request('http://localhost:3001')
      .post(`/signup`)
      .send(createUserDto)
      .then(res => {
        expect(res.statusCode).toEqual(HttpStatus.BAD_REQUEST);
        expect(res.body.message).toEqual('Invalid user data');
      });
  });

  test('정상적으로 로그인 성공하면 결과 메시지를 받는다', async () => {
    const loginUserDto = {
      email: 'honggildong',
      password: '12345678!',
    }
    const loginResult = {
      id: 1,
      email: 'honggildong@gmail.com',
      userName: '하영',
      phoneNumber: '01012345678',
      token: jwtService.sign('honggildong@gmail.com'),
    }

    request('http://localhost:3001')
      .post('/login')
      .send(loginUserDto)
      .then(res => {
        expect(res.statusCode).toEqual(HttpStatus.OK);
        expect(res.body.result).toEqual(loginResult);
        expect(res.body.message).toEqual('회원가입 완료');
      })
  });

  test('잘못된 로그인 정보를 입력하면, 입력값 오류 메시지를 받는다.', async () => {
    const loginUserDto = {
      email: 'honggildong',
      password: '12345678!',
    }

    request('http://localhost:3001')
      .post('/login')
      .send(loginUserDto)
      .then(res => {
        expect(res.statusCode).toEqual(HttpStatus.BAD_REQUEST);
        expect(res.body.message).toEqual('Invalid user data');
      });
  });
});
