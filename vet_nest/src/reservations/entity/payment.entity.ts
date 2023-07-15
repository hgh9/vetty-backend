import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Reservation } from './reservation.entity';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  appId: string;

  @Column()
  payMethod: number;

  @Column()
  amount: number;

  @Column()
  status: number;

  @Column()
  createdAt: Date;

  @Column()
  canceledAt?: Date | null;

  @Column()
  reservationId: number;

  @ManyToOne(() => Reservation, (reservation) => reservation.payments, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  reservation: Reservation;
}
