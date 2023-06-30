import { Module } from '@nestjs/common';
import { PetsService } from './pets.service';

@Module({
  providers: [PetsService]
})
export class PetsModule {}
