import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Pet } from '../../pets/entity/pet.entity';
import { User } from '../../users/entity/users.entity';
import { Reservation } from '../../reservations/entity/reservation.entity';
import { Booking } from '../../bookings/entity/booking.entity';

@Entity()
export class Vet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  name: string;

  @Column()
  phone: string;

  @Column()
  address: string;

  @Column('point')
  location: string;

  @Column('text')
  introduce: string;

  @Column()
  departments: DepartmentsCategory;

  @Column()
  type: vetType;

  @Column('number')
  @OneToMany(() => Booking, (booking) => booking.vet)
  booking: Booking;

  @ManyToOne(() => User, (user) => user.vet)
  user: User;

  @OneToMany(() => Pet, (pet) => pet.vet)
  pet: Pet[];

  @OneToOne(() => Vet, (vet) => vet.reservation)
  reservation: Reservation;
}

// export interface Geometry {
//   type: 'Point';
//   coordinates: [Number, Number];
// }

export enum DepartmentsCategory {
  // 종합검진
  COMPREHENSIVE_EXAMINATION = 1,

  // 영상의학과
  DEPARTMENT_OF_RADIOLOGY = 2,

  // 심장센터
  HEART_CENTER = 3,

  // 내과
  MEDICINE = 4,

  // 외과
  SURGICAL = 5,

  // 피부과
  DERMATOLOGY = 6,

  // 종양센터
  ONCOLOGY_CENTER = 7,

  // 줄기세포
  STEM_CELLS = 8,

  // 치과
  DENTIST = 9,

  // 안과
  OPHTHALMOLOGY = 10,

  // 예방접종
  VACCINATION = 11,
}

export enum vetType {
  //24시간
  ALL_DAYS = 1,
  //야간
  NIGHT_TIME = 2,
  // 주간
  DAY_TIME = 3,
}
