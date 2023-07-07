import { Test, TestingModule } from '@nestjs/testing';
import { PetsController } from '../pets.controller';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';

const LOCAL_HOST = 'http://localhost:3001';

describe('LIST PET', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({}).compile();

    app = module.createNestApplication();
    await app.init;
  });

  test('GET /pets lists pets of the user', () => {
    const userId = 1;

    request(LOCAL_HOST)
      .get(`/pets?userId=${userId}`)
      .then((res: request.Response) => {
        expect(res.statusCode).toEqual(HttpStatus.OK);
        //expect(res.body.result).toEqual(something);
      });
  });

  test('GET /pets fails when userId is not given', () => {
    const userId = null;

    request(LOCAL_HOST)
      .get(`/pets?userId=${userId}`)
      .then((res: request.Response) => {
        expect(res.statusCode).toEqual(HttpStatus.BAD_REQUEST);
        expect(res.body.result).toBeFalsy();
        expect(res.body.message).toEqual('userId is required');
      });
  });
});

describe('ADD PET', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({}).compile();

    app = module.createNestApplication();
    await app.init;
  });

  test('POST /pets adds a pet of the user', () => {
    const addPetDto = {
      name: 'goyangyi',
      species: 'CAT',
      birth: '2022-01-01',
      weightKg: 5,
      category: 1,
      breed: 'Russian Blue',
      age: 1,
      allergy: null,
      illness: null,
      neutered: true,
      userId: 1,
    };

    request(LOCAL_HOST)
      .post(`/pets`)
      .send(addPetDto)
      .then((res: request.Response) => {
        expect(res.statusCode).toEqual(HttpStatus.CREATED);
        //expect(res.body.result).toEqual(something);
      });
  });

  test('POST /pets fails when required data are missing', () => {
    const addPetDto = {
      name: 'goyangyi',
      species: null,
      birth: '2022-01-01',
      weightKg: 5,
      breed: 'Russian Blue',
      age: 1,
      allergy: null,
      illness: null,
      neutered: true,
      userId: 1,
    };

    request(LOCAL_HOST)
      .post(`/pets`)
      .send(addPetDto)
      .then((res: request.Response) => {
        expect(res.statusCode).toEqual(HttpStatus.BAD_REQUEST);
        expect(res.body.result).toBeFalsy();
        expect(res.body.message).toEqual('valid pet data are required');
      });
  });
});

describe('UPDATE PET', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({}).compile();

    app = module.createNestApplication();
    await app.init;
  });

  test('PUT /pets updates a pet of the user', () => {
    const updatePetDto = {
      petId: 1,
      name: 'goyangyi',
      species: 'CAT',
      birth: '2022-01-01',
      weightKg: 5,
      breed: 'Russian Blue',
      category: 1,
      age: 1,
      allergy: null,
      illness: null,
      neutered: true,
      userId: 1,
    };

    request(LOCAL_HOST)
      .put(`/pets`)
      .send(updatePetDto)
      .then((res: request.Response) => {
        expect(res.statusCode).toEqual(HttpStatus.OK);
        //expect(res.body.result).toEqual(something);
      });
  });

  test('PUT /pets fails when required data are missing', () => {
    const updatePetDto = {
      petId: 1,
      name: 'goyangyi',
      species: null,
      birth: '2022-01-01',
      weightKg: 5,
      breed: 'Russian Blue',
      age: 1,
      allergy: null,
      illness: null,
      neutered: true,
      userId: 1,
    };

    request(LOCAL_HOST)
      .put(`/pets`)
      .send(updatePetDto)
      .then((res: request.Response) => {
        expect(res.statusCode).toEqual(HttpStatus.BAD_REQUEST);
        expect(res.body.result).toBeFalsy();
        expect(res.body.message).toEqual('valid pet data are required');
      });
  });
});

describe('DELETE PET', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({}).compile();

    app = module.createNestApplication();
    await app.init;
  });

  test('DELETE /pets deletes the pet', () => {
    const petId = 1;

    request(LOCAL_HOST)
      .delete(`/pets?petId=${petId}}`)
      .then((res: request.Response) => {
        expect(res.statusCode).toEqual(HttpStatus.OK);
        //expect(res.body.result).toEqual(something);
      });
  });

  test('DELETE /pets fails when petId is not given', () => {
    const petId = null;

    request(LOCAL_HOST)
      .delete(`/pets?petId=${petId}`)
      .then((res: request.Response) => {
        expect(res.statusCode).toEqual(HttpStatus.BAD_REQUEST);
        expect(res.body.result).toBeFalsy();
        expect(res.body.message).toEqual('petId is required');
      });
  });
});
