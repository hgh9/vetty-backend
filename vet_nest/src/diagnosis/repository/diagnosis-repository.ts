import { Reservation } from '../../reservations/entity/reservation.entity';
import { Inject, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class DiagnosisRepository {
  private reservationRepository: Repository<Reservation>;
  constructor(
    @Inject('DATA_SOURCE')
    private readonly dataSource: DataSource,
  ) {
    this.reservationRepository = this.dataSource.getRepository(Reservation);
  }

  // 진료완료
  // async updateDignosisStatusById(reservationId: number) {
  //   const result = this.reservationRepository.findOneBy({
  //     id: reservationId,
  //   });
  //   return result;
  // }

  async getDiagnosisByVetId(vetId: number, treatmentStatus: number) {
    const list = await this.reservationRepository
      .createQueryBuilder('reservation')
      .where('reservation.vetId = :vetId', { vetId: vetId })
      .andWhere('reservation.treatmentStatus = :treatmentStatus', {
        treatmentStatus,
      })
      .getMany();

    return list;
  }

  // async getDiagnosisByUser(userId: number) {
  //   const list = await this.reservationRepository
  //     .createQueryBuilder('reservation')
  //     .where('reservation.id = :userId', { userId })
  //     .getMany();

  //   return list;
  // }

  // 진료내역가져와야해
  async getDiagnosisDetailByUser(userId, treatmentStatus) {
    const list = await this.reservationRepository
      .createQueryBuilder('reservation')
      .where('reservation.id = :userId', { userId })
      .andWhere('reservation.treatmentStatus = :treatmentStatus', {
        treatmentStatus,
      })
      .andWhere('reservation.treatmentStatus = :treatmentStatus', {
        treatmentStatus,
      })
      .getMany();

    return list;
  }
}
