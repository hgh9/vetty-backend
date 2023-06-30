import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
export class VetDto {
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

  //   @ManyToOne(() => User, (user) => user.pet)
  //   user: User;

  //   @OneToMany(() => Reservation, (reservation) => reservation.pet)
  //   reservation: Reservation[];
}
