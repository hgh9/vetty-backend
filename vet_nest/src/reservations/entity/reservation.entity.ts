import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationId,
  UpdateDateColumn,
} from 'typeorm';
import { Payment } from './payment.entity';
import { Pet } from '../../pets/entity/pet.entity';
import { User } from '../../users/entity/users.entity';
import { Vet } from '../../vets/entity/vet.entity';
import { TimeSlot } from '../../vets/entity/timeslot.entity';

@Entity()
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
  })
  receptionMethod: ReceptionMethod;

  @Column({
    type: 'int',
  })
  status: TreatmentStatus;

  @Column()
  reservedAt: Date;

  @Column()
  vetId: number;

  // @Column()
  // // @RelationId((slot: TimeSlot) => slot.id)
  // slotId: number;

  // @RelationId((pet: Pet) => pet.petId)
  @Column()
  petId: string;

  @Column()
  userId: number;

  @Column()
  treatmentStatus: TreatmentStatus;

  @Column({
    type: 'decimal',
  })
  amount: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;

  @ManyToOne(() => TimeSlot, (slot) => slot)
  @JoinColumn({ name: 'slotId' })
  slotInfo?: TimeSlot;

  @ManyToOne(() => Pet, (pet) => pet)
  @JoinColumn({ name: 'petId' })
  petInfo?: Pet;

  @ManyToOne(() => Vet, (vet) => vet)
  @JoinColumn({ name: 'vetId' })
  vetInfo?: Vet;

  @ManyToOne(() => User, (user) => user)
  @JoinColumn({ name: 'userId' })
  userInfo?: User;

  @OneToMany(() => Payment, (payment) => payment.reservation, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  payments?: Payment[];

  constructor() {}

  public cancel(): void {
    this.status = TreatmentStatus.RESERVATION_CANCELED;
    this.updatedAt = new Date();
  }
}

export enum TreatmentStatus {
  RESERVATION_COMPLETED = 1,
  IN_TREATMENT = 2,
  TREATMENT_COMPLETED = 3,
  RESERVATION_CANCELED = -1,
  TREATMENT_CANCELED = -2,
}

export enum ReceptionMethod {
  RESERVATION = 'R',
  ON_SITE = 'O',
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
