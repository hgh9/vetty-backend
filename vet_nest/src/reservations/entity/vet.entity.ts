import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Pet } from './pet.entity';
import { User } from '../../users/entity/users.entity';
import { Reservation } from './reservation.entity';

@Entity()
export class Vet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  name: string;

  @Column()
  phone: string;

  @Column()
  departments: DepartmentsCategory;

  @Column()
  vetWorkingTime: [1, 31, 45, 0, 0, 0, 0];

  @ManyToOne(() => User, (user) => user.vet)
  user: User;

  @OneToMany(() => Pet, (pet) => pet.vet)
  pet: Pet[];

  // @OneToOne(() => Vet, (vet) => vet.reservation)
  // reservation: Reservation;
}

export enum DepartmentsCategory {}

// - 종합검진
// - 영상의학과
// - 심장센터
// - 내과
// - 외과
// - 피부과
// - 종양센터
// - 줄기세포
// - 치과
// - 안과
// - 예방 접종
