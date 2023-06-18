import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Photo {
  // @ApiProperty({
  //   required: false,
  //   type: 'number',
  //   name: 'id',
  //   description: 'id',
  // })
  // @IsOptional()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    default: '얌느',
    required: true,
    type: 'string',
    name: 'name',
    description: '사용자 이름',
  })
  @IsOptional()
  @Column({ length: 500 })
  name: string;

  @ApiProperty({
    default: '설명이에요',
    required: true,
    type: 'string',
    name: 'description',
    description: '설명',
  })
  @IsOptional()
  @Column('text')
  description: string;

  @ApiProperty({
    default: 'hello.jpg',
    required: true,
    type: 'string',
    name: 'filename',
    description: '파일이름',
  })
  @IsOptional()
  @Column()
  filename: string;

  @ApiProperty({
    default: 1,
    required: true,
    type: 'number',
    name: 'views',
    description: '조회수',
  })
  @IsOptional()
  @Column('int')
  views: number;

  @ApiProperty({
    default: true,
    required: true,
    type: 'boolean',
    name: 'isPublished',
    description: '배포가 되었나요?',
  })
  @IsOptional()
  @Column()
  isPublished: boolean;
}
