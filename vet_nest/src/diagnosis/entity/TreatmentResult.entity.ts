import { Reservation } from '../../reservations/entity/reservation.entity';
import { Column, Entity, OneToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class TreatmentResult {
  @PrimaryColumn()
  @OneToOne((type) => Reservation, (reservation) => reservation.id)
  id: number;

  @Column({
    type: 'varchar',
  })
  treatmentResult: string;
}
