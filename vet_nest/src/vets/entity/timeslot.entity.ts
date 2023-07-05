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

  @Column()
  startDate: Date;

  @Column()
  time: number;

  @Column({
    type: 'timestamp'
  })
  startTime: Date

  @Column({
    type: 'timestamp'
  })
  endTime: Date

  @Column()
  vetId: number;

  @ManyToOne(() => Vet, (vet) => vet)
  @JoinColumn({name: 'vetId'})
  vet: Vet;;

  @ManyToOne(() => Reservation, (reservation) => reservation.slotInfo)
  reservation: Reservation;
}
