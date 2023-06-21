import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { IReservationsCancelation } from './reservation-cancelation.interface';
import { ReservationEntity } from './entity/reservation.entity';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
// -> ReservationCancelationRepositoryService
export class ReservationCancelationService implements IReservationsCancelation {

    constructor(
        @Inject('RESERVATION_REPOSITORY')
        private reservationRepository: Repository<ReservationEntity>
    ) {}
    
    cancelReservation(reservationId: number): boolean {
        
        //1. 예약정보를 조회한다. 
            
        return true;
    }

    private async getReservation(reservationId: number): Promise<ReservationEntity>
    {
        return await this.reservationRepository.findOneBy({
            reservationId: reservationId
        });
    }
}