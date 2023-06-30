import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pet } from './entity/pets.entity';
import { addPetDto } from '@/pets/dto/addPet.dto';

@Injectable()
export class PetsService {
  constructor(
    @InjectRepository(Pet)
    private readonly petRepository: Repository<Pet>,
  ) {}

  async addPet(addPetDto: addPetDto) {
    if (!this.isAddPetDtoValid(addPetDto)) {
      throw new Error('invalid data');
    }

    const newPet = this.petRepository.create(addPetDto);
    await this.petRepository.save(newPet);
    return newPet;
  }

  async modifyPet() {
    return false;
  }

  async deletePet() {
    return false;
  }

  async listPet() {
    return false;
  }

  private isAddPetDtoValid(addPetDto: addPetDto) {
    return true;
  }
}
