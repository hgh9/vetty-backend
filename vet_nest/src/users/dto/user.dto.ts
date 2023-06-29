import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UserDto {
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
    default: '1',
    required: false,
    type: 'number',
    name: 'id',
    description: 'id',
  })
  @IsOptional()
  email: string;

  @ApiProperty({
    default: '1',
    required: false,
    type: 'number',
    name: 'id',
    description: 'id',
  })
  @IsOptional()
  userName: string;

  @ApiProperty({
    default: '1',
    required: false,
    type: 'number',
    name: 'id',
    description: 'id',
  })
  @IsOptional()
  password: string;

  @ApiProperty({
    default: '010-0000-0000',
    required: false,
    type: 'string',
    name: 'phoneNumber',
    description: '전화번호',
  })
  @IsOptional()
  phoneNumber: string;
}

export class UserIdDto extends PickType(UserDto, ['id']) {}

export class GetUserDto extends PickType(UserDto, [
  'id',
  'phoneNumber',
  'email',
]) {}
