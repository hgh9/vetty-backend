import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

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
  name: string;

  @ApiProperty({
    default: '설명이에요',
    required: true,
    type: 'string',
    name: 'description',
    description: '설명',
  })
  @IsOptional()
  description: string;

  @ApiProperty({
    default: 'hello.jpg',
    required: true,
    type: 'string',
    name: 'filename',
    description: '파일이름',
  })
  @IsOptional()
  filename: string;

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
}
