import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { addPetDto } from '@/pets/dto/addPet.dto';
import { AddPetDto, Pet } from './entity/pet.entity';

@Injectable()
export class PetsService {
  private petRepository: Repository<Pet>;

  constructor(
    @Inject('DATA_SOURCE')
    private readonly dataSource: DataSource, // @InjectRepository(Reservation) // private readonly reservationReposiotory: Repository<Reservation>, // @InjectRepository(Payment) // private readonly paymentReposiotory: Repository<Payment>,
  ) {
    this.petRepository = this.dataSource.getRepository(Pet);
  }

  async addPet(addPetDto: AddPetDto) {
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

  private isAddPetDtoValid(addPetDto: AddPetDto) {
    return true;
  }
}
