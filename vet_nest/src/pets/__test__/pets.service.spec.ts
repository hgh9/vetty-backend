import { Test, TestingModule } from '@nestjs/testing';
import { PetsService } from '../pets.service';
import { PetCategories, PetGender } from '../entity/pet.entity';
import { PetsRepositoryMock } from '../repository/pets.repository.mock';
import { PetsRepository } from '../repository/pets.repository';

describe('LIST PET', () => {
  let service: PetsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: PetsRepository,
          useClass: PetsRepositoryMock,
        },
        PetsService,
      ],
    }).compile();

    service = module.get<PetsService>(PetsService);
  });

  test('listPet fails when userId is missing', async () => {
    const userId = null;

    try {
      await service.listPet(userId);
    }
    catch(error) {
      expect(error).toBeInstanceOf(Error);
    }

    expect.assertions(1);
  });

  test('listPet passes with a valid userId', async () => {
    const userId = 1;
    const petList = [
      {
        petId: '1',
        userId: 1,
        name: 'goyangyi',
        category: PetCategories.CAT,
        breed: 'Russian Blue',
        weightKg: 4,
        age: 1,
        birth: null,
        gender: PetGender.MALE,
        neutered: true,
        allergy: null,
        vaccinate: null,
        extraInfo: null,
        createdAt: null,
      },
    ];

    const result = await service.listPet(userId);

    expect(result).toEqual(petList);
  });
});

describe('ADD PET', () => {
  let service: PetsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: PetsRepository,
          useClass: PetsRepositoryMock,
        },
        PetsService,
      ],
    }).compile();

    service = module.get<PetsService>(PetsService);
  });

  test('addPet fails when pet data are not valid', async () => {
    const noNameCat = {
      userId: 1,
      name: null,
      category: PetCategories.CAT,
      breed: 'Russian Blue',
      weightKg: 4,
      age: 1,
      birth: null,
      gender: PetGender.MALE,
      neutered: true,
      allergy: null,
      vaccinate: null,
      extraInfo: null,
    };

    try {
      await service.addPet(noNameCat);
    }
    catch(error) {
      expect(error).toBeInstanceOf(Error);
    }

    expect.assertions(1);
  });

  test('addPet passes with valid pet data', async () => {
    const addPetDto = {
      userId: 1,
      name: 'goyangyi',
      category: PetCategories.CAT,
      breed: 'Russian Blue',
      weightKg: 4,
      age: 1,
      birth: null,
      gender: PetGender.MALE,
      neutered: true,
      allergy: null,
      vaccinate: null,
      extraInfo: null,
    };
    const addedPet = Object.assign({}, addPetDto, { petId: 1 });

    const result = await service.addPet(addPetDto);

    expect(result).toEqual(addedPet);
  });
});

describe('UPDATE PET', () => {
  let service: PetsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: PetsRepository,
          useClass: PetsRepositoryMock,
        },
        PetsService,
      ],
    }).compile();

    service = module.get<PetsService>(PetsService);
  });

  test('updatePet fails when pet data are not valid', async () => {
    const noNameCat = {
      petId: 1,
      userId: 1,
      name: null,
      category: PetCategories.CAT,
      breed: 'Russian Blue',
      weightKg: 4,
      age: 1,
      birth: null,
      gender: PetGender.MALE,
      neutered: true,
      allergy: null,
      vaccinate: null,
      extraInfo: null,
    };

    try {
      await service.updatePet(noNameCat);
    }
    catch(error) {
      expect(error).toBeInstanceOf(Error);
    }

    expect.assertions(1);
  });

  test('updatePet passes with valid pet data', async () => {
    const updatePetDto = {
      petId: 1,
      userId: 1,
      name: 'goyangyi',
      category: PetCategories.CAT,
      breed: 'Russian Blue',
      weightKg: 4,
      age: 1,
      birth: null,
      gender: PetGender.MALE,
      neutered: true,
      allergy: null,
      vaccinate: null,
      extraInfo: null,
    };

    const result = await service.updatePet(updatePetDto);

    expect(result).toEqual(updatePetDto);
  });
});

describe('DELETE PET', () => {
  let service: PetsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: PetsRepository,
          useClass: PetsRepositoryMock,
        },
        PetsService,
      ],
    }).compile();

    service = module.get<PetsService>(PetsService);
  });

  test('deletePet fails when petId and userId dont match ', async () => {
    const userId = 99;
    const petId = 1;

    try {
      await service.deletePet(petId, userId);
    }
    catch (error) {
      expect(error).toBeInstanceOf(Error);
    }

    expect.assertions(1);
  });

  test('deletePet passes with valid pet and user data', async () => {
    const userId = 1;
    const petId = 1;
    const deletedRows = 1;

    const result = await service.deletePet(petId, userId);

    expect(result).toEqual(deletedRows);
  });
});
