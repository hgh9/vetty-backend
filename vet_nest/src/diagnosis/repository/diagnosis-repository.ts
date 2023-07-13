import { Reservation } from '../../reservations/entity/reservation.entity';
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class DiagnosisRepository extends Repository<Reservation> {
  constructor(private dataSource: DataSource) {
    super(Reservation, dataSource.createEntityManager());
  }

  //데이터 잘 나오는지 테스트 필요
  async getDiagnosisListByVetId(vetId: number, treatmentStatus: number) {
    return await this.createQueryBuilder('dianosis')
      .where('dianosis.vetId = :vetId', { vetId })
      .andWhere('dianosis.treatmentStatus = :treatmentStatus', {
        treatmentStatus,
      });
  }
}
