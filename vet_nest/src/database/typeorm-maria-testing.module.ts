import { DataSource, DataSourceOptions } from 'typeorm';
import { Payment } from './../reservations/entity/payment.entity';
import { Reservation } from './../reservations/entity/reservation.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User, UserLevel, UserStatus } from '../users/entity/users.entity';

export const testDbDataSource: DataSourceOptions = {
  type: 'mariadb',
  host: '127.0.0.1',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'test',
  synchronize: true,
  logging: true,
  entities: [Reservation, Payment],
};

export const TypeORMMariaSqlTestingModule = (entities: any[]) =>
  TypeOrmModule.forRoot(testDbDataSource);

export const initializeDataSource = async (): Promise<DataSource> => {
  const dataSource = new DataSource(testDbDataSource); // <--- made it a function, because of other reason.
  return await dataSource.initialize();
};
