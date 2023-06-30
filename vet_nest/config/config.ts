import { DataSource } from 'typeorm';
import { Photo } from '../src/photos/entity/photos.entity';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import {
  Reservation,
  ReservationStatus,
} from './../src/reservations/entity/reservation.entity';
import { Payment } from './../src/reservations/entity/payment.entity';
import * as moment from 'moment';

export default () => ({
  DB: {
    type: process.env.DB_TYPE === 'mariadb' ? 'mariadb' : 'mysql',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: ['dist/**/*.entity.js'],
    synchronize: process.env.DB_SYNCHRONIZE === 'true' ? true : false,
  },
  NEST: {
    PORT: process.env.REACT_APP_NEST_LOCAL_PORT,
    HOST:
      process.env.REACT_APP_ENV === 'local'
        ? 'localhost'
        : process.env.REACT_APP_NEST_HOSTNAME,
  },
  REACT: {
    PORT: process.env.REACT_LOCAL_PORT,
  },
  REDIS: {
    PORT: process.env.REACT_APP_REDIS_LOCAL_PORT,
    HOST:
      process.env.REACT_APP_ENV === 'local'
        ? 'localhost'
        : process.env.REACT_APP_REDIS_HOSTNAME,
  },

  // databaseProviders: databaseProviders,
  databaseConfig,
  testDbConfig,
});

export const databaseConfig: TypeOrmModuleOptions = {
  type: process.env.DB_TYPE === 'mariadb' ? 'mariadb' : 'mysql',
  host:
    process.env.REACT_APP_ENV === 'local' ? 'localhost' : process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: process.env.DB_SYNCHRONIZE === 'true' ? true : false,
  autoLoadEntities: true,
  logging: true,
  // entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
  // entities: [Photo, Reservation,],
};

export const testDbConfig: TypeOrmModuleOptions = {
  type: process.env.DB_TYPE === 'mariadb' ? 'mariadb' : 'mysql',
  host:
    process.env.REACT_APP_ENV === 'local' ? 'localhost' : process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: 'root',
  password: 'root',
  database: 'test',
  synchronize: process.env.DB_SYNCHRONIZE === 'true' ? true : false,
  autoLoadEntities: true,
  logging: true,
};

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: process.env.DB_TYPE === 'mariadb' ? 'mariadb' : 'mysql',
        host:
          process.env.REACT_APP_ENV === 'local'
            ? 'localhost'
            : process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        synchronize: process.env.DB_SYNCHRONIZE === 'true' ? true : false,
        entities: [Photo, Reservation, Payment],
      });

      return dataSource.initialize();
    },
    inject: ['DATA_SOURCE']
  },
  {
    provide: 'TEST_DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mariadb',
        host: '127.0.0.1',
        port: 3306,
        username: 'root',
        password: 'root',
        database: 'test',
        synchronize: true,
        logging: true,
        entities: [Photo, Reservation, Payment],
      });

      return dataSource.initialize().then((db) => {
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
    },
  },
];
