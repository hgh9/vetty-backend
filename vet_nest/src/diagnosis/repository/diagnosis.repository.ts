import { Reservation } from '@/reservations/entity/reservation.entity';
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class diagnosisRepository extends Repository<Reservation> {
  constructor(private dataSource: DataSource) {
    super(Reservation, dataSource.createEntityManager());
  }
}
