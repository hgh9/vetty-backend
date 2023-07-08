import { DataSource, EntityRepository, Repository } from "typeorm";
import { Reservation } from "../entity/reservation.entity";
import { Inject, Injectable } from "@nestjs/common";

@EntityRepository(Reservation)
export class ReservationReposiotory extends  Repository<Reservation>
{
    constructor(
      @Inject('DATA_SOURCE') 
      private readonly dataSource: DataSource
    ) {
      super(Reservation, dataSource.createEntityManager());       
    }
    
    async getReservationById(reservationId: number): Promise<Reservation | null> {
        return await this.findOneBy({id: reservationId});
    }
}