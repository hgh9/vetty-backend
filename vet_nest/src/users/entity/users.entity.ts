import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Pet } from '../../reservations/entity/pet.entity';
import { Reservation } from '../../reservations/entity/reservation.entity';
import { Vet } from '../../reservations/entity/vet.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  userName: string;

  @Column()
  phoneNumber: string;

  @Column()
  level: UserLevel;

  //hospital name
  //hospital phone
  //hospital address
  //hostpital geo
  //hosppital introduce
  //depart

  // 펫 관계설정 petTable 에다가 연결

  @OneToMany(() => Pet, (pet) => pet.user)
  pet: Pet[];

  @OneToMany(() => Reservation, (reservation) => reservation.user)
  reservation: Reservation[];

  @OneToMany(() => Vet, (vet) => vet.user)
  vet: Vet[];
}

export enum UserLevel {
  HOSPITAL_MANAGER = 1,
  CUSTOMER = 2,
}

export enum VetDepartments {
  HOSPITAL_MANAGER = 1,
  CUSTOMER = 2,
}
