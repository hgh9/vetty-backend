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
import { Vet } from './vet.entity';

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @Column()
  @OneToOne(() => User, (user) => user.bookings)
  users: User;

  @Column()
  @ManyToOne(() => Vet, (vet) => vet.booking)
  vet: Vet;

  @Column()
  @OneToMany(() => TimeSlot, (timeSlot) => timeSlot)
  timeSlot: TimeSlot;
}
