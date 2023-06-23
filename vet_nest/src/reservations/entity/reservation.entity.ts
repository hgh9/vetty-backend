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

  @Column()
  status: string;

  @OneToMany(() => Payment, (payment) => payment.reservation)
  payments: Payment[];
}
