import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Reservation } from './reservation.entity';
import { Vet } from '../../vets/entity/vet.entity';
import { ReservationTime } from './reservationTime.entity';

@Entity()
export class TimeSlot {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @Column()
  time: number;
  //slot

  @ManyToOne(() => Vet, (vet) => vet.timeSlot)
  vet: Vet;

  @OneToMany(
    () => ReservationTime,
    (reservationTime) => reservationTime.timeSlot,
  )
  reservationTime: ReservationTime;

  @ManyToOne(() => Reservation, (reservation) => reservation.timeSlot)
  reservation: Reservation;
}
