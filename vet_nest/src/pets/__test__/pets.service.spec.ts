import { Test, TestingModule } from '@nestjs/testing';
import { PetsService } from '../pets.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Pet } from '../entity/pets.entity';
import { addPetDto } from '@/pets/dto/addPet.dto';

describe('add pet', () => {
  let service: PetsService;
  let petRepositoryMock: jest.Mocked<Repository<Pet>>;

  const addPetDto: addPetDto = {
    species: 'cat',
    petName: 'goyangyi',
    birth: '2023-01-01',
    weight: '4kg',
    kind: 'Russian Blue',
    sex: 'male',
    allergy: 'orange',
    neutered: true,
    illness: null,
  };
  const addedPet: Pet = {
    id: 1,
    species: 'cat',
    petName: 'goyangyi',
    birth: '2023-01-01',
    weight: '4kg',
    kind: 'Russian Blue',
    sex: 'male',
    allergy: 'orange',
    neutered: true,
    illness: null,
    userId: 1,
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
