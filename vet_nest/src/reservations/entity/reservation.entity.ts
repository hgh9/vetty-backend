import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Payment } from './payment.entity';
import { Pet } from '../../pets/entity/pet.entity';
import { User } from '../../users/entity/users.entity';
import { Vet } from '../../vets/entity/vet.entity';
import { TimeSlot } from './timeslot.entity';
import { ReservationTime } from './reservationTime.entity';

//TODO:
// 진료 과목, 진료 정보
// 진료 과목 :과 정보

// enum
// - 종합검진
// - 영상의학과
// - 심장센터
// - 내과
// - 외과
// - 피부과
// - 종양센터
// - 줄기세포
// - 치과
// - 안과
// - 예방 접종

// 예약 가능한 시간 날짜
// 예약금 확인
// 초진 재진

// enum
// - 초진
//     - 일반진료
//     - 예방접종
//     - 건강검진
//     - 수술상담
// - 재진
//     - 일반진료
//     - 예방접종
//     - 검강검진
//     - 수술상담

// - vetName : 동물병원 이름
// - vetPhoneNumber : 동물병원 전화번호
// - vetDepartmets : [] 동물병원 진료 과목
// - vetWorkingSetting: date
// - vetWorkingTime : [ 1,31, 45 ,0, 0, 0,0] 슬롯 0~23까지

/**
 * -예약정보
 * 반려정보
 * 병원정보
 * 사용자정보
 * 예약날짜 및 시간
 * 예약정보 변경 시간
 * 예약금 결제 유/무
 * 예약 상태
 * 결제 상태
 */

@Entity()
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'int',
  })
  firstVisit?: DignosisCategory | null;

  @Column({
    type: 'int',
  })
  reVisit?: DignosisCategory | null;

  @Column({
    type: 'int',
  })
  status: ReservationStatus;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  // @Column()
  // updatedAt?: Date | null;

  @Column()
  reservedAt: Date;

  @OneToMany(() => Payment, (payment) => payment.reservation, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  payments: Payment[];

  @ManyToOne(() => Pet, (pet) => pet.reservation, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  pet?: Pet;

  @ManyToOne(() => User, (user) => user.reservation, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  user?: User;

  @OneToOne(() => Vet, (vet) => vet.reservation)
  vet?: Vet;

  @OneToMany(() => TimeSlot, (timeSlot) => timeSlot.reservation)
  timeSlot: TimeSlot;

  @OneToOne(
    () => ReservationTime,
    (reservationTime) => reservationTime.reservation,
  )
  reservationTime: ReservationTime;
}

export enum ReservationStatus {
  COMPLETED = 1,
  IN_TREATMENT = 2,
  TREATMENT_COMPLETED = 3,
  CANCELED = -1,
}
export enum DignosisCategory {
  NORMAL = 1,
  VACCINATING = 2,
  HEALTH_CHECK = 3,
  SURGERY_COUNSELOR = 4,
}
//     - 일반진료
//     - 예방접종
//     - 검강검진
//     - 수술상담
