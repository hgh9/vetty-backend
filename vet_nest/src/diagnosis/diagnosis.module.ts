import { Module } from '@nestjs/common';
import { DisgnosisController } from './diagnosis.controller';

import { DatabaseModule } from '@/database/database.module';
import { DiagnosisService } from './diagnosis.service';

@Module({
  imports: [DatabaseModule], // to use repository
  controllers: [DisgnosisController],
  providers: [DiagnosisService],
  exports: [DiagnosisService], //은닉을 public으로 변경
})
export class DiagnosisModule {}
