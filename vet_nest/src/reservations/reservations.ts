import { DataSource } from "typeorm";
import { ReservationEntity } from "./entity/reservation.entity";

export const reservationProvider = [
    {
      provide: 'RESERVATION_REPOSITORY',
      useFactory: (dataSource: DataSource) => dataSource.getRepository(ReservationEntity),
      inject: ['DATA_SOURCE'],
    },
  ];