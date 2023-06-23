import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
