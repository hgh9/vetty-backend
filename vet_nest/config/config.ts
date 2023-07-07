import { DataSource, Timestamp } from 'typeorm';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import {
  ReceptionMethod,
  Reservation,
  TreatmentStatus,
} from './../src/reservations/entity/reservation.entity';
import { Payment } from './../src/reservations/entity/payment.entity';
import {
  Pet,
  PetCategories,
  PetGender,
  PetVaccinatedInfo,
} from '../src/pets/entity/pet.entity';
import { Vet, VetStatus } from '../src/vets/entity/vet.entity';
import { TimeSlot } from '../src/vets/entity/timeslot.entity';
import { User, UserLevel, UserStatus } from '../src/users/entity/users.entity';
import { Logger } from 'winston';
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
  timezone: 'z',
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
  timezone: 'z',
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
        logging: false,
        entities: [User, Pet, Vet, TimeSlot, Reservation, Payment],
      });

      dataSource.initialize();
      // .then(dbInitializeCallback);

      return dataSource;
    },
  },
];

export async function dbInitializeCallback(db: DataSource) {
  console.log(`db initialized`);
  const vetRepo = db.getRepository(Vet);
  vetRepo.save(<Vet>{
    vetId: 1,
    name: '잘한다동물병원',
    status: VetStatus.USE,
  });

  const userRepo = db.getRepository(User);
  userRepo.save([
    {
      id: 1,
      userName: '이민규',
      email: 'iamdevstar@gmail.com',
      password: 'plainText',
      phoneNumber: '01072475702',
      kakaoId: 'minkyu5782@hanmail.net',
      level: UserLevel.CUSTOMER,
      status: UserStatus.USE,
    },
    {
      id: 2,
      userName: '박닥터',
      email: 'doctor@gmail.com',
      password: 'plainText',
      phoneNumber: '010111111111',
      kakaoId: 'doctor.park@kakao.com',
      level: UserLevel.HOSPITAL_MANAGER,
      status: UserStatus.USE,
      vetId: 1,
    },
  ]);

  const petRepo = db.getRepository(Pet);
  petRepo.save([
    {
      petId: '39cd623e-bbb7-404f-b0c9-d16f39443820',
      userId: 1,
      name: '야옹이',
      category: PetCategories.CAT,
      breed: '?',
      weightKg: 10.5,
      age: 4,
      birth: new Date('2019.01.01'),
      gender: PetGender.MALE,
      neutered: true,
      allergy: '?', // N개일 수 있을 듯
      vaccinate: PetVaccinatedInfo.VACCINATED,
      extraInfo: '기타',
    },
    {
      petId: '263df66a-c1e0-4ad3-94e7-bf8236ec3f09',
      userId: 1,
      name: '멍멍이',
      category: PetCategories.DOG,
      breed: '?',
      weightKg: 29.51,
      age: 10,
      birth: new Date('2012.01.01'),
      gender: PetGender.FEMALE,
      neutered: true,
      allergy: '?', // N개일 수 있을 듯
      vaccinate: PetVaccinatedInfo.VACCINATED,
      extraInfo: '기타',
    },
  ]);

  const timeSlotRepo = db.getRepository(TimeSlot);
  timeSlotRepo.save({
    id: 1,
    startDate: new Date('2023-01-01'),
    vetId: 1,
    time: 1,
    startTime: '00:00',
    endTime: '01:00',
  });

  const reservationRepo = db.getRepository(Reservation);
  reservationRepo.save([
    {
      id: 1,
      receptionMethod: ReceptionMethod.RESERVATION,
      status: TreatmentStatus.RESERVATION_COMPLETED,
      reservedAt: moment().add(1.5, 'hours').toDate(),
      vetId: 1,
      slotId: 1,
      petId: '263df66a-c1e0-4ad3-94e7-bf8236ec3f09',
      userId: 1,
      treatmentStatus: TreatmentStatus.RESERVATION_COMPLETED,
      amount: 10000,
    },
    {
      id: 2,
      receptionMethod: ReceptionMethod.RESERVATION,
      status: TreatmentStatus.RESERVATION_COMPLETED,
      reservedAt: moment().add(0.5, 'hours').toDate(),
      vetId: 1,
      slotId: 1,
      petId: '263df66a-c1e0-4ad3-94e7-bf8236ec3f09',
      userId: 1,
      treatmentStatus: TreatmentStatus.RESERVATION_COMPLETED,
      amount: 10000,
    },
    {
      id: 3,
      receptionMethod: ReceptionMethod.RESERVATION,
      status: TreatmentStatus.RESERVATION_COMPLETED,
      reservedAt: moment().add(1.5, 'hours').toDate(),
      vetId: 1,
      slotId: 1,
      petId: '263df66a-c1e0-4ad3-94e7-bf8236ec3f09',
      userId: 1,
      treatmentStatus: TreatmentStatus.RESERVATION_CANCELED,
      amount: 10000,
    },
  ]);
}
