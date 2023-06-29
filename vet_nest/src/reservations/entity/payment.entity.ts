import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Reservation } from './reservation.entity';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  appId: string;

  @Column()
  method: string;

  @Column()
  amount: number;

  @Column()
  status: string;

  @Column()
  createdAt: Date;

  @Column()
  canceledAt?: Date | null;

  @Column()
  reservationId: number;

  @ManyToOne(() => Reservation, (reservation) => reservation.payments)
  reservation: Reservation;
}
