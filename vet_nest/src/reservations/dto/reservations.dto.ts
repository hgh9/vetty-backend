import { ApiProperty, PickType } from '@nestjs/swagger';
import {
  IsDate,
  IsEnum,
  IsNotEmptyObject,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import {
  DignosisCategory,
  ReceptionMethod,
  TreatmentStatus,
} from '../entity/reservation.entity';
import { Type } from 'class-transformer';
import { PaymentDto } from '../../payments/dto/payment.dto';
import { TimeSlotDto } from './timeslot.dto';

export class ReservastionsDto {
  @IsOptional()
  id?: number;

  // @ApiProperty({
  //   name: 'status',
  //   type: ReservationStatus,
  // })
  @ApiProperty({
    default: '',
    required: false,
    type: 'string',
    name: 'firstVisit',
    description: '초진',
  })
  @IsEnum(DignosisCategory)
  firstVisit?: DignosisCategory;

  @ApiProperty({
    default: '',
    required: false,
    type: 'string',
    name: 'reVisit',
    description: '재방문자',
  })
  @IsEnum(DignosisCategory)
  reVisit?: DignosisCategory;

  @ApiProperty({
    default: '얌느',
    required: true,
    type: 'string',
    name: 'name',
    description: '사용자 이름',
  })
  @IsEnum(TreatmentStatus)
  status: TreatmentStatus;

  @ApiProperty({
    default: true,
    required: true,
    type: 'boolean',
    name: 'updatedAt',
    description: '배포가 되었나요?',
  })
  @IsDate()
  updatedAt?: Date | null;

  @ApiProperty({
    default: '2023-01-02',
    required: true,
    type: 'Date',
    name: 'reservedAt',
    description: '예약날짜',
  })
  @IsDate()
  @Type(() => Date)
  reservedAt?: Date | null;

  @ApiProperty({
    default: ReceptionMethod.RESERVATION,
    required: true,
    type: 'enum',
    name: 'receptionMethod',
    description: '예약방법',
  })
  @IsEnum(ReceptionMethod)
  receptionMethod: ReceptionMethod;
  // @ApiProperty({
  //   default: '',
  //   required: true,
  //   type: 'array',
  //   name: 'payments',
  //   description: '결제정보',
  // })
  // @IsOptional()
  // paymentId: number;

  @ApiProperty({
    default: '',
    required: true,
    type: 'string',
    name: 'pet',
    description: 'Pet정보',
  })
  @IsUUID()
  petId: string;

  @ApiProperty({
    default: 1,
    required: true,
    type: 'number',
    name: 'vetId',
    description: 'vet정보',
  })
  @IsNumber()
  vetId: number;

  @ApiProperty({
    default: 1,
    required: true,
    type: 'number',
    name: 'slotId',
    description: 'vet정보',
  })
  @IsNumber()
  slotId: number;

  @ApiProperty({
    default: '',
    required: true,
    type: 'object',
    name: 'user',
    description: 'user정보',
  })
  @IsNumber()
  userId: number;

  @ApiProperty({
    default: TreatmentStatus.TREATMENT_COMPLETED,
    required: true,
    type: 'enum',
    name: 'treatmentStatus',
    description: '예약종류',
  })
  @IsEnum(DignosisCategory)
  treatmentStatus: DignosisCategory;

  @ApiProperty({
    default: 30000,
    required: true,
    type: 'number',
    name: 'amount',
    description: '결제 금액',
  })
  @IsNumber()
  amount: number;
}

export class ReservationProcessDto extends PickType(ReservastionsDto, [
  'id',
  'firstVisit',
  'reVisit',
  'reservedAt',
  'userId',
  'vetId',
  'petId',
  'slotId',
  'status',
  'receptionMethod',
  'treatmentStatus',
  'amount'
]) {
  @ApiProperty({
    // default: '2023-01-02',
    required: true,
    type: 'object',
    name: 'timeSlot',
    description: '예약 시간',
  })
  @IsObject({ each: true })
  @IsNotEmptyObject()
  // @ValidateNested()
  @Type(() => TimeSlotDto)
  timeSlot?: TimeSlotDto;

  @ApiProperty({
    // default: '2023-01-02',
    required: true,
    type: 'object',
    name: 'object',
    description: '결제 정보',
  })
  @IsObject({ each: true })
  @IsNotEmptyObject()
  // @ValidateNested()
  @Type(() => PaymentDto)
  payments?: PaymentDto;
}

// export class findByEmailDto extends PickType(ReservastionsDto, ['vetHahah']) {}
