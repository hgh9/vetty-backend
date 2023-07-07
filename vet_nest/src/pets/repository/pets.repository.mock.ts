import { Repository, DataSource } from 'typeorm';
import { Pet } from '../entity/pet.entity';
import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class PetsRepositoryMock
{
  findByUserId(userId) {
    return [
      {
        petId: '1',
        userId: 1,
        name: 'goyangyi',
        category: 1,
        breed: 'Russian Blue',
        weightKg: 4,
        age: 1,
        birth: null,
        gender: 1,
        neutered: true,
        allergy: null,
        vaccinate: null,
        extraInfo: null,
        createdAt: null,
      },
    ];
  }
  
  addPet(addPetDto) {
    return {
      userId: 1,
      petId: 1,
      name: 'goyangyi',
      category: 1,
      breed: 'Russian Blue',
      weightKg: 4,
      age: 1,
      birth: null,
      gender: 1,
      neutered: true,
      allergy: null,
      vaccinate: null,
      extraInfo: null,
    };
  }
  
  updatePet(updatePetDto) {
    return {
      userId: 1,
      petId: 1,
      name: 'goyangyi',
      category: 1,
      breed: 'Russian Blue',
      weightKg: 4,
      age: 1,
      birth: null,
      gender: 1,
      neutered: true,
      allergy: null,
      vaccinate: null,
      extraInfo: null,
    };
  }
  
  isPetUsers(userId, petId) {
    return userId === 1 && petId === 1;
  }
  
  deletePet(petId) {
    return 1;
  }
}
