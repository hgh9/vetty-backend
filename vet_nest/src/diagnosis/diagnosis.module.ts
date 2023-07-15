import { Module } from '@nestjs/common';
import { DisgnosisController } from './diagnosis.controller';

import { DatabaseModule } from '../database/database.module';
import { DiagnosisService } from './diagnosis.service';
import { DiagnosisRepository } from './repository/diagnosis-repository';
import { ReservationReposiotory } from '../reservations/repository/reservation-repository';

@Module({
  imports: [DatabaseModule], // to use repository
  controllers: [DisgnosisController],
  providers: [DiagnosisService, DiagnosisRepository, ReservationReposiotory],
  exports: [DiagnosisService, DiagnosisRepository], //은닉을 public으로 변경
})
export class DiagnosisModule {}
