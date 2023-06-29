import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  userName: string;

  @Column()
  phoneNumber: string;

  @Column()
  level: UserLevel;

  //hospital name
  //hospital phone
  //hospital address
  //hostpital geo
  //hosppital introduce
  //depart


  // 펫 관계설정 petTable 에다가 연결
}

export enum UserLevel {
  HOSPITAL_MANAGER = 1,
  CUSTOMER = 2,
}

export enum VetDepartments{
  HOSPITAL_MANAGER = 1,
  CUSTOMER = 2,
}

