import { DataSource } from 'typeorm';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import {
  Reservation,
  ReservationStatus,
} from './../src/reservations/entity/reservation.entity';
import { Payment } from './../src/reservations/entity/payment.entity';
import * as moment from 'moment';
import { Pet } from '../src/pets/entity/pet.entity';
import { Vet } from '../src/vets/entity/vet.entity';
import { TimeSlot } from '../src/reservations/entity/timeslot.entity';
import { User } from '../src/users/entity/users.entity';
import { ReservationTime } from '../src/reservations/entity/reservationTime.entity';

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
        // autoLoadEntities: true,
        logging: false,
        // entities: [Reservation, Payment],
        entities: [
          Reservation,
          Payment,
          Pet,
          Vet,
          TimeSlot,
          User,
          ReservationTime,
        ],
      });

      return dataSource.initialize();
    },
  },
];
