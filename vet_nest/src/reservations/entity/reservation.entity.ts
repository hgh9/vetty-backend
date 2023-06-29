import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Payment } from './payment.entity';

@Entity()
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  vetName: string;

  @Column('text')
  vetHahah: string;

  @Column()
  vetPopo: string;

  @Column('int')
  views: number;

  @Column()
  isPublished: boolean;

  @Column({
    type: 'int',
  })
  status: ReservationStatus;

  @Column()
  updatedAt?: Date | null;

  @Column()
  reservedAt: Date;

  @OneToMany(() => Payment, (payment) => payment.reservation)
  payments: Payment[];
}

export enum ReservationStatus {
  COMPLETED = 1,
  IN_TREATMENT = 2,
  TREATMENT_COMPLETED = 3,
  CANCELED = -1,
}
