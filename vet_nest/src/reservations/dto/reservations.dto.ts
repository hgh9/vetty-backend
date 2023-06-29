import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { Payment } from '../entity/payment.entity';
import { ReservationStatus } from '../entity/reservation.entity';

export class ReservastionsDto {
  @IsOptional()
  id?: number;

  @ApiProperty({
    default: '얌느',
    required: true,
    type: 'string',
    name: 'name',
    description: '사용자 이름',
  })
  @IsOptional()
  vetName: string;

  @ApiProperty({
    default: 'diasm2@gmail.com',
    required: true,
    type: 'string',
    name: 'vetHahah',
    description: '사용자 이름',
  })
  @IsOptional()
  vetHahah: string;

  @ApiProperty({
    default: '얌느',
    required: true,
    type: 'string',
    name: 'name',
    description: '사용자 이름',
  })
  @IsOptional()
  vetPopo: string;

  @ApiProperty({
    default: 'hello.jpg',
    required: false,
    type: 'int',
    description: '파일이름',
  })
  @IsOptional()
  status: ReservationStatus;

  @ApiProperty({
    default: 1,
    required: true,
    type: 'number',
    name: 'views',
    description: '조회수',
  })
  @IsOptional()
  views: number;

  @ApiProperty({
    default: true,
    required: true,
    type: 'boolean',
    name: 'isPublished',
    description: '배포가 되었나요?',
  })
  @IsOptional()
  isPublished: boolean;

  @ApiProperty({
    default: true,
    required: true,
    type: 'boolean',
    name: 'updatedAt',
    description: '배포가 되었나요?',
  })
  @IsOptional()
  updatedAt?: Date | null;

  @ApiProperty({
    default: '2023-01-02',
    required: true,
    type: 'Date',
    name: 'reservedAt',
    description: '예약날짜',
  })
  @IsOptional()
  reservedAt?: Date | null;

  // @ApiProperty({
  //   default: true,
  //   required: true,
  //   type: 'Date',
  //   name: 'createdAt',
  //   description: '생성 날짜',
  // })
  // createdAt?: Date | null;

  // @ApiProperty({
  //   default: true,
  //   required: true,
  //   type: 'boolean',
  //   name: 'isPublished',
  //   description: '배포가 되었나요?',
  // })
  // @IsOptional()
  // payments: Payment[];
}

export class findByEmailDto extends PickType(ReservastionsDto, ['vetHahah']) {}
