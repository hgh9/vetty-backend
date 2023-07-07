import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Pet } from '../../pets/entity/pet.entity';
import { Reservation } from '../../reservations/entity/reservation.entity';
import { Vet } from '../../vets/entity/vet.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  password: string;

  @Column()
  userName: string;

  @Column({ nullable: true })
  kakaoId?: string;

  @Column()
  email: string;

  @Column()
  phoneNumber: string;

  @Column({ type: 'int', nullable: true })
  status: UserStatus;
  
  @Column({ nullable: true })
  level: UserLevel;

  @Column({ nullable: true })
  vetId: number | null;

  @ManyToOne((type) => Vet, (vet) => vet)
  @JoinColumn({ name: 'vetId' })
  vetInfo: Vet;

  @OneToMany((type) => Pet, (pet) => pet.userInfo)
  @JoinColumn({ name: 'userId' })
  pets?: Pet[];

  @OneToMany(() => Reservation, (reservation: Reservation) => reservation.userInfo)
  @JoinColumn({ name: 'userId' })
  reservations?: Reservation[];
}

export enum UserStatus {
  USE = 1,
  DELETE = 4,
}

export enum UserLevel {
  HOSPITAL_MANAGER = 1,
  CUSTOMER = 2,
}
