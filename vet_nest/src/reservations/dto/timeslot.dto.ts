import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';

export class TimeSlotDto {
  @IsOptional()
  id?: number;

  @ApiProperty({
    default: 3,
    required: false,
    type: 'number',
    name: 'time',
    description: '슬롯 넘버',
  })
  @IsNumber()
  time?: number;

  @ApiProperty({
    default: '2023-01-01',
    required: false,
    type: 'date',
    name: 'startDate',
    description: '타임슬롯 ',
  })
  @IsDateString()
  startDate?: Date;

  @ApiProperty({
    default: '00:00:00',
    required: false,
    type: 'string',
    name: 'startTime',
    description: '시작시간',
  })
  @IsString()
  // @Transform(({ value }) => value && new Date(value))
  startTime?: string;

  @ApiProperty({
    default: '00:00:00',
    required: false,
    type: 'string',
    name: 'endTime',
    description: '끝나는시간',
  })
  @IsString()
  endTime?: string;

  // @IsOptional()
  @ApiProperty({
    default: 1,
    required: false,
    type: 'number',
    name: 'vetId',
    description: 'vetId',
  })
  @IsNumber()
  vetId?: number;
  // console.log(startDate)
}

export class CheckingDateCommand extends PickType(TimeSlotDto, ['startDate']) {}
export class TimeSlotResultCommand extends PickType(TimeSlotDto, [
  'startTime',
  'endTime',
]) {}

export class SetTimeSlotCommand extends PickType(TimeSlotDto, [
  'startDate',
  'startTime',
  'endTime',
  'time',
  'vetId',
]) {}
// const hello = new TimeSlotDto();

// hello.startDate = '2020-01-01';
