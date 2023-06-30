import { DataSource, DataSourceOptions } from 'typeorm';
import { Photo } from './../photos/entity/photos.entity';
import { Payment } from './../reservations/entity/payment.entity';
import { Reservation, ReservationStatus } from './../reservations/entity/reservation.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as moment from 'moment';

export const testDbDataSource: DataSourceOptions = {
    type: 'mariadb',
    host: '127.0.0.1',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'test',
    synchronize: true,
    logging: true,
    entities: [Photo, Reservation, Payment]
  };

export const TypeORMMariaSqlTestingModule = (entities: any[]) =>
  TypeOrmModule.forRoot(testDbDataSource);

export const initializeDataSource = async (): Promise<DataSource> => {
    const dataSource = new DataSource(testDbDataSource);  // <--- made it a function, because of other reason.
    await dataSource.initialize().then((db) => {
        const reservationRepository = db.getRepository(Reservation);
        const paymentRepository = db.getRepository(Payment);

        const insertSuccessfulReservation = <Reservation>{
          id: 1,
          vetName: '바른병원',
          vetPopo: 'popo',
          isPublished: true,
          status: ReservationStatus.COMPLETED,
          views: 100,
          vetHahah: 'haha',
          reservedAt: moment().add(2, 'hours').toDate(),
          payments: [
            {
              id: 1,
              amount: 1000,
              appId: 'APP-1',
              createdAt: new Date(),
              method: 'CARD',
              status: 'C',
            },
          ],
        };
        const insertCancelableTimeOverReservation = Object.assign({}, insertSuccessfulReservation);
        insertCancelableTimeOverReservation.reservedAt = moment().add(30, 'minutes').toDate();
        insertCancelableTimeOverReservation.id = 2;

        const insertCanceledReservation = Object.assign(
          {},
          insertSuccessfulReservation,
        );
        insertCanceledReservation.id = 3;
        insertCanceledReservation.status = ReservationStatus.CANCELED;

        reservationRepository.save(insertSuccessfulReservation);
        reservationRepository.save(insertCancelableTimeOverReservation);
        reservationRepository.save(insertCanceledReservation);
    });
    return dataSource;
};