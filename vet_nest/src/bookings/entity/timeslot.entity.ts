import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Booking } from './booking.entity';

@Entity()
export class TimeSlot {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  //0~24
  @Column()
  time: number;

  @ManyToOne(() => Booking, (booking) => booking.timeSlot, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  booking?: Booking;
}
