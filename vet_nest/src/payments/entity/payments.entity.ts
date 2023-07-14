import { PrimaryGeneratedColumn, Entity, Column, ManyToOne } from 'typeorm';
import { Reservation } from '../../reservations/entity/reservation.entity';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  paymentId: number;

  @Column({ nullable: true })
  appId: string;

  @Column()
  method: string;

  @Column()
  amount: number;

  @Column()
  status: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ nullable: true })
  canceledAt?: Date | null;

  @Column()
  reservationId: number;

  @ManyToOne(() => Reservation, (reservation) => reservation.payments, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  reservation: Reservation;
}
