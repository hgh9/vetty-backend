
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Reservation } from '../entity/reservation.entity';
import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

@Entity()
export class Payment {
  id: number;

  @ApiProperty({
    default: '얌느',
    required: true,
    type: 'string',
    name: 'name',
    description: '사용자 이름',
  })
  @IsOptional()
  appId: string;

  @ApiProperty({
    default: '얌느',
    required: true,
    type: 'string',
    name: 'name',
    description: '사용자 이름',
  })
  @IsOptional()
  method: string;

  @ApiProperty({
    default: '얌느',
    required: true,
    type: 'string',
    name: 'name',
    description: '사용자 이름',
  })
  @IsOptional()
  amount: number;

  @ApiProperty({
    default: '얌느',
    required: true,
    type: 'string',
    name: 'name',
    description: '사용자 이름',
  })
  @IsOptional()
  status: string;

  @ApiProperty({
    default: '얌느',
    required: true,
    type: 'string',
    name: 'name',
    description: '사용자 이름',
  })
  @IsOptional()
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
    default: '얌느',
    required: true,
    type: 'string',
    name: 'name',
    description: '사용자 이름',
  })
  @IsOptional()
  reservationId: number;

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
