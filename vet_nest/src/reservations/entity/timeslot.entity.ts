import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Reservation } from './reservation.entity';

@Entity()
export class TimeSlot {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @Column()
  time: number;
  //slot

  @ManyToOne(() => Reservation, (reservation) => reservation.timeSlot)
  reservation: Reservation;
}
