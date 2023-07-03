import { Module } from '@nestjs/common';
import { PetsService } from './pets.service';
import { DatabaseModule } from '../database/database.module';
import { PetsController } from './pets.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [PetsController],
  providers: [PetsService],
})
export class PetsModule {}
