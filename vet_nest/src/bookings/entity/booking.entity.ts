import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entity/users.entity';
import { TimeSlot } from './timeslot.entity';
import { Vet } from '../../vets/entity/vet.entity';

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  // @Column()
  // @OneToOne(() => User, (user) => user.booking)
  // user: User;

  @ManyToOne(() => Vet, (vet) => vet.booking)
  vet: Vet;

  @OneToMany(() => TimeSlot, (timeSlot) => timeSlot.booking)
  timeSlot: TimeSlot;

  @OneToOne(() => User, (user) => user.booking)
  user: User;
}
