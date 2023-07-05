import { Inject, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { AddPetDto, Pet } from './entity/pet.entity';

@Injectable()
export class PetsService {
  private petRepository: Repository<Pet>;

  constructor(
    @Inject('DATA_SOURCE')
    private readonly dataSource: DataSource,
  ) {
    this.petRepository = this.dataSource.getRepository(Pet);
  }

  async addPet(addPetDto: AddPetDto) {
    if (!this.isAddPetDtoValid(addPetDto)) {
      throw new Error('valid pet data are required');
    }

    const newPet = this.petRepository.create(addPetDto);
    await this.petRepository.save(newPet);
    return newPet;
  }

  async updatePet(petDto) {
    if (!this.isUpdatePetDtoValid(petDto) || petDto.species === null) {
      throw new Error('valid pet data are required');
    }

    const updatedPet = await this.petRepository.update(petDto.petId, petDto);
    return updatedPet;
  }

  async deletePet(petId) {
    return true;
  }

  async listPet(userId) {
    if (!userId) {
      throw Error('userId is required');
    }
    return [];
  }

  private isAddPetDtoValid(addPetDto: AddPetDto) {
    return true;
  }

  private isUpdatePetDtoValid(addPetDto: AddPetDto) {
    return true;
  }
}
