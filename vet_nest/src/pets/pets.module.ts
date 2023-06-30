import { Module } from '@nestjs/common';
import { PetsService } from './pets.service';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [PetsService],
})
export class PetsModule {}
