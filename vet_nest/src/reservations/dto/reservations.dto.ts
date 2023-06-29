import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { Payment } from '../entity/payment.entity';
import { ReservationStatus } from '../entity/reservation.entity';

export class ReservastionsDto {
  id: number;

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
    name: 'isPublished',
    description: '배포가 되었나요?',
  })
  
  
  updatedAt?: Date | null;

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
