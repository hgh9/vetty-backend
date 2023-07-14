import { DataSource, DataSourceOptions } from 'typeorm';
import { Payment } from '../payments/entity/payments.entity';
import { Reservation } from './../reservations/entity/reservation.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User, UserLevel, UserStatus } from '../users/entity/users.entity';
import { Vet } from '../vets/entity/vet.entity';
import { TimeSlot } from '../vets/entity/timeslot.entity';
import { Pet } from '../pets/entity/pet.entity';
import { TreatmentResult } from '@/diagnosis/entity/TreatmentResult.entity';

export const testDbDataSource: DataSourceOptions = {
  type: 'mariadb',
  host: '127.0.0.1',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'test',
  synchronize: true,
  logging: true,
  timezone: '+09:00',
  entities: [Reservation, Payment, Vet, TimeSlot, Pet, User, TreatmentResult],
};

export const TypeORMMariaSqlTestingModule = (entities: any[]) =>
  TypeOrmModule.forRoot(testDbDataSource);

export const initializeDataSource = async (): Promise<DataSource> => {
  const dataSource = new DataSource(testDbDataSource); // <--- made it a function, because of other reason.
  return await dataSource.initialize();
};
