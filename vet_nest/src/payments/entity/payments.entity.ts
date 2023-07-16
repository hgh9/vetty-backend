import { PrimaryGeneratedColumn, Entity, Column, ManyToOne } from 'typeorm';
import { Reservation } from '../../reservations/entity/reservation.entity';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  paymentId: number;

  @Column({ nullable: true })
  appId: string;

  @Column({
    type: 'varchar'
  })
  method: PaymentMethod;

  @Column()
  amount: number;

  @Column({
    type: 'varchar'
  })
  status: PaymentStatus;

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

  isCanceled(): boolean {
    return this.status == PaymentStatus.CANCELD;
  }
  
  cancel() {
    this.status = PaymentStatus.CANCELD;
    this.canceledAt = new Date();
  }
}

export enum PaymentStatus {
  COMPLETE = 'COMPLETED',
  CANCELD  = 'CANCELED'
}

export enum PaymentMethod {
  CARD = 'CARD', 
  CASH = 'CASH',
  ACCOUNT_TRANSFER = 'ACCOUNT_TRANSFER'
}
