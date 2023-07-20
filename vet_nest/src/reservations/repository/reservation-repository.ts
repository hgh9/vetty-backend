import { DataSource, EntityRepository, Raw, Repository } from 'typeorm';
import { ReceptionMethod, Reservation } from '../entity/reservation.entity';
import { Inject, Injectable } from '@nestjs/common';

@EntityRepository(Reservation)
export class ReservationReposiotory extends Repository<Reservation> {
  constructor(
    @Inject('DATA_SOURCE')
    private readonly dataSource: DataSource,
  ) {
    super(Reservation, dataSource.createEntityManager());
  }

  async getReservationById(reservationId: number): Promise<Reservation | null> {
    return await this.findOneBy({ id: reservationId });
  }

  async getReservationsByUser(
    userId: number,
    startDate?: string,
    endDate?: string,
  ): Promise<Reservation[]> {
    let query: any = {};
    query.userId = userId;
    if (startDate && endDate) {
      query.reservedAt = Raw(
        (alias) =>
          `DATE(${alias}) >= ${startDate} && DATE(${alias}) <= :endDate`,
        { startDate: startDate, endDate: endDate },
      );
    }
    return this.findBy(query);
  }

  async getReservationByVetId(vetId: number): Promise<Reservation[]> {
    return await this.createQueryBuilder('reservation')
      .where('reservation.vetId = :vetId', { vetId: vetId })
      .getMany();
  }

  // async updateReservaionStatusById(reservationId: number) {
  //   return this.findOneBy({
  //     id: reservationId,
  //   });
  // }
}
