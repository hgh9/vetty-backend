import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Reservation } from '../../reservations/entity/reservation.entity';
import { ApiProperty, PickType } from '@nestjs/swagger';
import {
  IsDate,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export enum PayMethod {
  CASH = 0,
  CARD = 1,
  BANK_TRANSFER = 2,
}

export enum PaymentStatus {
  PENDING = 0,
  CANCEL = 1,
  COMPLETE = 2,
  REFUND = 3,
}

@Entity()
export class PaymentDto {
  id?: number;

  @ApiProperty({
    default: '123123123',
    required: true,
    type: 'string',
    name: 'appId',
    description: '사용자 이름',
  })
  @IsUUID()
  appId: string;

  @ApiProperty({
    default: PayMethod.CARD,
    required: true,
    type: 'enum',
    name: 'method',
    description: '거래 방법 ',
  })
  @IsEnum(PayMethod)
  payMethod: PayMethod;

  @ApiProperty({
    default: 30000,
    required: true,
    type: 'number',
    name: 'amount',
    description: '결제 금액',
  })
  @IsNumber()
  amount: number;

  @ApiProperty({
    default: PaymentStatus.PENDING,
    required: true,
    type: 'enum',
    name: 'status',
    description: '결제 상태',
  })
  @IsEnum(PaymentStatus)
  status: PaymentStatus;

  @ApiProperty({
    default: '2023-01-01',
    required: true,
    type: 'date',
    name: 'createdAt',
    description: '결제 생성일자',
  })
  @IsDate()
  createdAt: Date;

  @ApiProperty({
    default: '얌느',
    required: true,
    type: 'string',
    name: 'name',
    description: '사용자 이름',
  })
  @IsOptional()
  canceledAt?: Date | null;

  @ApiProperty({
    default: 1,
    required: true,
    type: 'number',
    name: 'reservationId',
    description: '예약 Id',
  })
  @IsNumber()
  reservationId: number;

  // @ApiProperty({
  //   default: '얌느',
  //   required: true,
  //   type: 'string',
  //   name: 'name',
  //   description: '사용자 이름',
  // })
  // @IsOptional()
  // reservation: Reservation;
}

export class PaymentProcessDto extends PickType(PaymentDto, [
  'appId',
  'amount',
  'status',
  'payMethod',
  'reservationId',
  'createdAt',
]) {
  @ApiProperty({
    default: '얌느',
    required: true,
    type: 'string',
    name: 'name',
    description: '사용자 이름',
  })
  @IsOptional()
  reservation: Reservation;
}
