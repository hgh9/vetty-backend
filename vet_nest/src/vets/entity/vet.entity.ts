import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Pet } from '../../pets/entity/pet.entity';
import { User } from '../../users/entity/users.entity';
import { Reservation } from '../../reservations/entity/reservation.entity';
import { TimeSlot } from './timeslot.entity';

@Entity()
export class Vet {
  @PrimaryGeneratedColumn()
  vetId: number;

  @Column({ length: 500 })
  name: string;

  @Column({
    type: 'int'
  })
  status: VetStatus;

  @OneToMany(() => Vet, 'vetId')
  @JoinColumn({name: 'vetId'})
  employees?: User[];

  @OneToMany(() => Reservation, (reservation) => reservation.vetInfo)
  @JoinColumn({name: 'vetId'})
  reservations?: Reservation[];

  @OneToMany(() => TimeSlot, (timeSlot) => timeSlot.vet)
  timeSlots: TimeSlot[];
}

export enum VetStatus {
  USE = 1,
  DELETE = 4
}
