import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { Payment } from '../entity/payment.entity';
import {
  DignosisCategory,
  ReservationStatus,
} from '../entity/reservation.entity';
import { PetDto } from '../../pets/dto/pet.dto';
import { VetDto } from '../../vets/dto/vet.dto';
import { ReservationUserDto, UserDto } from '../../users/dto/user.dto';

export class ReservastionsDto {
  @IsOptional()
  id?: number;

  @ApiProperty({
    name: 'status',
    type: ReservationStatus,
  })
  @ApiProperty({
    default: '',
    required: false,
    type: 'string',
    name: 'firstVisit',
    description: '초진',
  })
  @IsOptional()
  firstVisit?: DignosisCategory;

  @ApiProperty({
    default: '',
    required: false,
    type: 'string',
    name: 'reVisit',
    description: '재방문자',
  })
  @IsOptional()
  reVisit?: DignosisCategory;

  @ApiProperty({
    default: '얌느',
    required: true,
    type: 'string',
    name: 'name',
    description: '사용자 이름',
  })
  @IsOptional()
  status: ReservationStatus;

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

  @ApiProperty({
    default: '',
    required: true,
    type: 'array',
    name: 'payments',
    description: '결제정보',
  })
  @IsOptional()
  paymentId: number;

  @ApiProperty({
    default: '',
    required: true,
    type: 'object',
    name: 'pet',
    description: 'Pet정보',
  })
  @IsOptional()
  petId: number;

  @ApiProperty({
    default: '',
    required: true,
    type: 'number',
    name: 'vet',
    description: 'vet정보',
  })
  @IsOptional()
  vetId: number;

  @ApiProperty({
    default: '',
    required: true,
    type: 'object',
    name: 'user',
    description: 'user정보',
  })
  @IsOptional()
  userId: number;
}

// export class findByEmailDto extends PickType(ReservastionsDto, ['vetHahah']) {}
