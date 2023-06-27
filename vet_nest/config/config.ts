import { DataSource } from 'typeorm';
import { Photo } from '../src/photos/entity/photos.entity';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Reservation } from './../src/reservations/entity/reservation.entity';
import { Payment } from './../src/reservations/entity/payment.entity';

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
  // entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
  // entities: [Photo, Reservation,],
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
  },
  {
    provide: 'TEST_DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mariadb',
        host: 'mariadb',
        port: 3306,
        username: 'root',
        password: 'root',
        database: 'test',
        synchronize: true,
        logging: true,
        entities: [Photo, Reservation, Payment],
      });

      return dataSource.initialize()
        .then((db => {
          var reservationRepository = db.getRepository(Reservation);
          var paymentRepository = db.getRepository(Payment);

          reservationRepository.save(<Reservation>{
            id: 1,
            vetName: '바른병원',
            vetPopo: 'popo', 
            isPublished: true,
            status: 'C', 
            views: 100,
            vetHahah: 'haha',
            payments: [{
              id: 1, 
              amount: 1000, 
              appId: 'APP-1',
              createdAt: new Date(),
              method: 'CARD',
              reservationId: 1,
              status: 'C'
            }]
          });

          reservationRepository.save(<Reservation>{
            id: 2,
            vetName: '바른병원',
            vetPopo: 'popo', 
            isPublished: true,
            status: 'R', 
            views: 100,
            vetHahah: 'haha'
          });

        }));
    }
  },
];
