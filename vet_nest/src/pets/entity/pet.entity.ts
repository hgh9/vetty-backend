import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Reservation } from '../../reservations/entity/reservation.entity';
import { User } from '../../users/entity/users.entity';
import { Vet } from '../../vets/entity/vet.entity';

@Entity()
export class Pet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  name: string;

  @Column()
  category: PetCategories;

  @Column()
  breed: string;

  @Column()
  weightKg: number;

  @Column()
  age: number;

  @Column('date')
  birth: Date;

  @Column()
  gender: PetGender;

  @Column()
  allergi: string;

  @Column()
  vaccinate: PetVaccinatedInfo;

  @Column()
  extraInfo: string;

  @Column()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.pet, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  user?: User;

  @OneToMany(() => Reservation, (reservation) => reservation.pet)
  reservation?: Reservation[];

  @OneToMany(() => Vet, (vet) => vet.pet)
  vet?: Vet;
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
