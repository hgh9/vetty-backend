import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import {
  PetCategories,
  PetGender,
  PetVaccinatedInfo,
} from '../entity/pet.entity';
import { BaseEntity } from 'typeorm';

export class PetDto extends BaseEntity {
  @ApiProperty({
    default: '1',
    required: false,
    type: 'number',
    name: 'id',
    description: 'id',
  })
  @IsOptional()
  id?: number;

  @ApiProperty({
    default: '멍멍이',
    required: true,
    type: 'string',
    name: 'name',
    description: 'pet의 이름',
  })
  @IsOptional()
  name: string;

  @ApiProperty({
    default: 'CAT',
    required: true,
    type: PetCategories,
    name: 'category',
    description: '펫의 종(고양이, 개, 기타)',
  })
  @IsOptional()
  category: PetCategories;

  @ApiProperty({
    default: 'bo',
    required: true,
    type: 'string',
    name: 'breed',
    description: '펫의 종',
  })
  @IsOptional()
  breed: string;

  @ApiProperty({
    default: 13,
    required: true,
    type: 'number',
    name: 'weightKg',
    description: '펫의 무게',
  })
  @IsOptional()
  weightKg: number;

  @ApiProperty({
    default: 1,
    required: true,
    type: 'number',
    name: 'age',
    description: '나이 모르면 .... 100 으로? ',
  })
  @IsOptional()
  age: number;

  @ApiProperty({
    default: '2023-01-01',
    required: true,
    type: 'Date',
    name: 'birth',
    description: '펫의 생일',
  })
  @IsOptional()
  birth: Date;

  @ApiProperty({
    default: '2023-01-02',
    required: true,
    type: 'Date',
    name: 'reservedAt',
    description: '예약날짜',
  })
  @IsOptional()
  gender: PetGender;

  @ApiProperty({
    default: 'skin' ,
    required: true,
    type: 'string',
    name: 'allergi',
    description: '알러지유무',
  })
  @IsOptional()
  allergi: string;

  @ApiProperty({
    default: 1,
    required: true,
    type: 'number',
    name: 'vaccinate',
    description: '백신 상태',
  })
  @IsOptional()
  vaccinate: PetVaccinatedInfo;

  @ApiProperty({
    default: '아껴주세요',
    required: true,
    type: 'string',
    name: 'extraInfo',
    description: '기타 정보',
  })
  @IsOptional()
  extraInfo: string;

  @ApiProperty({
    default: '중성화',
    required: true,
    type: 'string',
    name: 'neutered',
    description: '중성화',
  })
  @IsOptional()
  neutered: boolean;
  //   @ManyToOne(() => User, (user) => user.pet)
  //   user: User;

  //   @OneToMany(() => Reservation, (reservation) => reservation.pet)
  //   reservation: Reservation[];
}

// export class findByEmailDto extends PickType(ReservastionsDto, ['vetHahah']) {}
