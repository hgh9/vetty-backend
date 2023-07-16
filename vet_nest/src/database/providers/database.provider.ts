import { DataSource, DataSourceOptions } from 'typeorm';
import { User, UserLevel, UserStatus } from '../../users/entity/users.entity';
import {
  Pet,
  PetCategories,
  PetGender,
  PetVaccinatedInfo,
} from '../../pets/entity/pet.entity';
import { TimeSlot } from '../../vets/entity/timeslot.entity';
import { Vet, VetStatus } from '../../vets/entity/vet.entity';
import {
  ReceptionMethod,
  Reservation,
  TreatmentStatus,
  DignosisCategory,
} from '../../reservations/entity/reservation.entity';
import * as moment from 'moment';
import { ConfigService } from '@nestjs/config';
import { Payment, PaymentMethod, PaymentStatus } from '@/payments/entity/payments.entity';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      const dataSource = new DataSource(
        configService.get<DataSourceOptions>('DB'),
      );
      dataSource.initialize().then(dbInitializeCallback);
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
      reservedAt: moment(new Date()).add(1.5, 'hours').add(9, 'hours').toDate(),
      vetId: 1,
      slotId: 1,
      petId: '263df66a-c1e0-4ad3-94e7-bf8236ec3f09',
      userId: 1,
      treatmentStatus: DignosisCategory.NORMAL,
      amount: 20000,
    },
    {
      id: 2,
      receptionMethod: ReceptionMethod.ON_SITE,
      status: TreatmentStatus.RESERVATION_COMPLETED,
      reservedAt: moment().add(0.5, 'hours').add(9, 'hours').toDate(),
      vetId: 1,
      slotId: 1,
      petId: '263df66a-c1e0-4ad3-94e7-bf8236ec3f09',
      userId: 1,
      treatmentStatus: DignosisCategory.VACCINATING,
      amount: 10000,
    },
    {
      id: 3,
      receptionMethod: ReceptionMethod.RESERVATION,
      status: TreatmentStatus.RESERVATION_COMPLETED,
      reservedAt: moment(new Date()).add(1.5, 'hours').add(9, 'hours').toDate(),
      vetId: 1,
      slotId: 1,
      petId: '263df66a-c1e0-4ad3-94e7-bf8236ec3f09',
      userId: 1,
      treatmentStatus: DignosisCategory.NORMAL,
      amount: 10000,
    },
    {
      id: 4,
      receptionMethod: ReceptionMethod.RESERVATION,
      status: TreatmentStatus.RESERVATION_COMPLETED,
      reservedAt: moment(new Date()).add(1.5, 'hours').add(9, 'hours').toDate(),
      vetId: 1,
      slotId: 1,
      petId: '263df66a-c1e0-4ad3-94e7-bf8236ec3f09',
      userId: 1,
      treatmentStatus: DignosisCategory.NORMAL,
      amount: 20000,
    },
  ]);

  const paymentRepo = db.getRepository(Payment);
  paymentRepo.save([{
    paymentId: 1,
    appId: '1280ad9c-31d9-4342-a7b2-3126a5ff738f',
    method: PaymentMethod.CARD,
    amount: 5000, 
    status: PaymentStatus.COMPLETE,
    reservationId: 1
  }, 
  ]);
}
