import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Reservation } from '../../reservations/entity/reservation.entity';
import { Vet } from './vet.entity';
// import { ReservationTime } from './reservationTime.entity';

@Entity()
export class TimeSlot {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'date'
  })
  startDate: Date;

  @Column()
  time: number;

  @Column({
    type: 'time'
  })
  startTime: string

  @Column({
    type: 'time'
  })
  endTime: string

  @Column()
  vetId: number;

  @ManyToOne(() => Vet, (vet) => vet)
  @JoinColumn({name: 'vetId'})
  vet?: Vet;

  @ManyToOne(() => Reservation, (reservation) => reservation.slotInfo)
  reservation?: Reservation;
}
