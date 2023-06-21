import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ReservationEntity {
    
    @PrimaryGeneratedColumn({
        name: 'reservation_id',
        type: 'int'
    })
    reservationId: number;
    userId: number;
}
