import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class TreatmentDto {
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
    default: '',
    required: true,
    type: 'string',
    name: 'treatmentResult',
    description: '진료 내용',
  })
  @IsOptional()
  treatmentResult: string;
}
