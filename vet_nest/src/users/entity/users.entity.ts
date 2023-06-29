import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Pet } from '../../pets/entity/pet.entity';
import { Reservation } from '../../reservations/entity/reservation.entity';
import { Vet } from '../../vets/entity/vet.entity';
import { Booking } from '../../bookings/entity/booking.entity';

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

  @Column()
  @OneToOne(() => Booking, (booking) => booking.users)
  bookings: Booking;

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
