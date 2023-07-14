import { DataSource, EntityRepository, Raw, Repository } from 'typeorm';
import { Reservation } from '../entity/reservation.entity';
import { Inject, Injectable } from '@nestjs/common';
import { CheckingDateCommand } from '../dto/timeslot.dto';
import { TimeSlot } from '../../vets/entity/timeslot.entity';
import { plainToInstance } from 'class-transformer';
import { ReservastionsDto } from '../dto/reservations.dto';

@EntityRepository(Reservation)
export class ReservationReposiotory extends Repository<Reservation> {
  constructor(
    @Inject('DATA_SOURCE')
    private readonly dataSource: DataSource,
  ) {
    super(Reservation, dataSource.createEntityManager());
  }

  async postReservation(reservationData: ReservastionsDto) {
    return this.insert(reservationData);
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
}
