import { Test, TestingModule } from '@nestjs/testing';
import { PetsService } from '../pets.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  AddPetDto,
  Pet,
  PetCategories,
  PetGender,
  PetVaccinatedInfo,
} from '../entity/pet.entity';

describe('add pet', () => {
  let service: PetsService;
  let petRepositoryMock: jest.Mocked<Repository<Pet>>;

  const addPetDto: AddPetDto = {
    // id: 1,
    age: 13,
    category: PetCategories.DOG,
    name: 'goyangyi',
    birth: new Date('2022-01-01'),
    weightKg: 4,
    breed: 'Russian Blue',
    gender: PetGender.FEMALE,
    allergi: ['skin'],
    neutered: true,
    extraInfo: 'hello',
    vaccinate: PetVaccinatedInfo.UNKNOWN_VACCINATED,
  };
  const addedPet: AddPetDto = {
    // id: 2,
    age: 14,
    category: PetCategories.CAT,
    name: 'goyangyi',
    birth: new Date('2021-01-01'),
    weightKg: 2,
    breed: 'Russian Blue',
    gender: PetGender.FEMALE,
    allergi: ['skin'],
    neutered: true,
    extraInfo: 'hello',
    vaccinate: PetVaccinatedInfo.UNKNOWN_VACCINATED,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PetsService,
        {
          provide: getRepositoryToken(Pet),
          useFactory: () => ({
            create: jest.fn(),
            save: jest.fn(),
          }),
        },
      ],
    }).compile();

    service = module.get<PetsService>(PetsService);
    petRepositoryMock = module.get(getRepositoryToken(Pet));
    petRepositoryMock.create.mockReturnValue(addedPet);
    petRepositoryMock.save.mockResolvedValue(addedPet);
  });

  test('required data is needed', async () => {
    // PASS
    const newPet = service.addPet(addPetDto);
    expect(newPet).toEqual(addedPet);

    // FAIL
    const missingData = (key) => {
      const copied = Object.assign({}, addPetDto);
      copied[key] = '';
      return copied;
    };

    const no_species = missingData('species');
    try {
      await service.addPet(no_species);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
  });
});
