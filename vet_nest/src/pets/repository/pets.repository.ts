import { Repository, DataSource, EntityRepository } from 'typeorm';
import { Pet } from '../entity/pet.entity';
import { Inject } from '@nestjs/common';

@EntityRepository(Pet)
export class PetsRepository extends Repository<Pet>
{
  constructor(
    @Inject('DATA_SOURCE')
    private readonly dataSource: DataSource
  ) {
    super(Pet, dataSource.createEntityManager());
  }
  
  async findByUserId(userId) {
    return await this.find({ where: { userId } });
  }
  
  async addPet(addPetDto) {
    const newPet = this.create(addPetDto);
    await this.save(newPet);
    return newPet;
  }
  
  async updatePet(updatePetDto) {
    return await this.update(updatePetDto.petId, updatePetDto);
  }
  
  async isPetUsers(petId, userId) {
    return await this.findOneBy({ petId, userId });
  }
  
  async deletePet(petId) {
    return (await this.delete({ petId })).affected;
  }
}
