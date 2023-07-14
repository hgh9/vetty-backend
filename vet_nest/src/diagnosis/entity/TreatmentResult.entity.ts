import { Reservation } from '@/reservations/entity/reservation.entity';
import { Column, Entity, OneToOne } from 'typeorm';

@Entity()
export class TreatmentResult {
  @OneToOne((type) => Reservation, (reservation) => reservation.id)
  id: number;

  @Column('varchar', { name: 'treatmentResult' })
  name: string;
}
