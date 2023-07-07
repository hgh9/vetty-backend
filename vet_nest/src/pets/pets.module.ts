import { Module } from '@nestjs/common';
import { PetsService } from './pets.service';
import { DatabaseModule } from '../database/database.module';
import { PetsController } from './pets.controller';
import { PetsRepository } from './repository/pets.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [PetsController],
  providers: [PetsService, PetsRepository],
})
export class PetsModule {}
