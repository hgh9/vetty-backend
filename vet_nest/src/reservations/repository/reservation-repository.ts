import { DataSource, EntityRepository, Raw, Repository } from 'typeorm';
import { Reservation } from '../entity/reservation.entity';
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

  async getAllReservationByStatus() {
    // 배열로 반환 타입 추가 필요
    return await this.find({
      where: {
        status: 1,
      },
    });
  }

  async updateReservaionStatusById(reservationId: number) {
    return this.findOneBy({
      //위에랑 똑같은데 따로 만들어서 사용해야되나?
      id: reservationId,
    });
  }
}
