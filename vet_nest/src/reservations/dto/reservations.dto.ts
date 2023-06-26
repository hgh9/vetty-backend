import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { Payment } from '../entity/payment.entity';

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
    required: true,
    type: 'string',
    name: 'filename',
    description: '파일이름',
  })
  @IsOptional()
  status: string;

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
