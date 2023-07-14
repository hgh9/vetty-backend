import { Injectable } from '@nestjs/common';
import { AddPetDto } from './entity/pet.entity';
import { PetsRepository } from './repository/pets.repository';

@Injectable()
export class PetsService {
  constructor(private readonly petsRepository: PetsRepository) {}

  async listPet(userId) {
    if (!userId) {
      throw Error('userId is required');
    }

    // TODO: common response, undefined => empty array
    return await this.petsRepository.findByUserId(userId);
  }

  async addPet(addPetDto: AddPetDto) {
    if (!this.isAddPetDtoValid(addPetDto)) {
      throw new Error('valid pet data are required');
    }

    return await this.petsRepository.addPet(addPetDto);
  }

  async updatePet(updatePetDto) {
    if (!this.isUpdatePetDtoValid(updatePetDto)) {
      throw new Error('valid pet data are required');
    }

    return await this.petsRepository.updatePet(updatePetDto);
  }

  async deletePet(petId, userId) {
    if (!petId || !userId) {
      throw new Error('valid data are required');
    }
    const isPetUsers = await this.petsRepository.isPetUsers(petId, userId);
    if (!isPetUsers) {
      throw new Error('the pet is not users');
    }
    return await this.petsRepository.deletePet(petId);
  }

  private isAddPetDtoValid(addPetDto) {
    return addPetDto.userId && addPetDto.name && addPetDto.category;
  }

  private isUpdatePetDtoValid(updatePetDto) {
    return (
      updatePetDto.userId &&
      updatePetDto.name &&
      updatePetDto.category &&
      updatePetDto.petId
    );
  }
}
