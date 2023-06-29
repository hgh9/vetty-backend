import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Booking } from './booking.entity';

@Entity()
export class TimeSlot {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('date')
  date: Date;

  //0~24
  @Column('number')
  time: number;

  @Column()
  @ManyToOne(() => Booking, (booking) => booking.timeSlot)
  booking: Booking;
}
