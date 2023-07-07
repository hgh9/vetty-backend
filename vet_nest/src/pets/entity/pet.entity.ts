import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { Reservation } from '../../reservations/entity/reservation.entity';
import { User } from '../../users/entity/users.entity';
import { PickType } from '@nestjs/swagger';
import { PetDto } from '../dto/pet.dto';

@Entity()
export class Pet {
  @PrimaryGeneratedColumn('uuid')
  petId: string;

  @Column()
  userId: number;
  
  @Column({ length: 500 })
  name: string;

  @Column()
  category: PetCategories;

  @Column({ nullable: true })
  breed: string;

  @Column({ nullable: true })
  weightKg: number;

  @Column({ nullable: true })
  age: number;

  @Column('date', { nullable: true })
  birth: Date;

  @Column({ nullable: true })
  gender: PetGender;

  @Column({ nullable: true })
  neutered: boolean;

  @Column({ nullable: true })
  allergy: string;

  @Column({ nullable: true })
  vaccinate: PetVaccinatedInfo;

  @Column({ nullable: true })
  extraInfo: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user)
  @JoinColumn({name: 'userId'})
  userInfo?: User;

  @OneToMany(() => Reservation, (reservation) => reservation.petInfo)
  reservations?: Reservation[];
}

export enum PetCategories {
  CAT = 1,
  DOG = 2,
  ETC = 3,
}

export enum PetGender {
  MALE = 1,
  FEMALE = 2,
  NEUTERED = 3,
}

export enum PetVaccinatedInfo {
  NOT_VACCINATED = 1,
  VACCINATED = 2,
  VACCINATING = 3,
  UNKNOWN_VACCINATED = 3,
}

export class AddPetDto extends PickType(PetDto, [
  'age',
  'name',
  'birth',
  'weightKg',
  'gender',
  'allergy',
  'vaccinate',
  'breed',
  'category',
  'extraInfo',
  'neutered',
]) {}
