import { DataSource, Repository } from "typeorm";
import { Reservation } from "../entity/reservation.entity";
import { Injectable } from "@nestjs/common";


@Injectable()
export class ReservationReposiotory extends  Repository<Reservation>
{
    constructor(private dataSource: DataSource) {
        super(Reservation, dataSource.createEntityManager());       
    }
    
    async findByReservationId(reservationId: number): Promise<Reservation | undefined>
    {
        const reservation = this.findOneBy({id: reservationId});
        return reservation;
    }
}