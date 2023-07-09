import { Module } from '@nestjs/common';
import { DisgnosisController } from './diagnosis.controller';

import { DatabaseModule } from '@/database/database.module';
import { DiagnosisService } from './diagnosis.service';

@Module({
  imports: [DatabaseModule],
  controllers: [DisgnosisController],
  providers: [DiagnosisService],
})
export class DiagnosisModule {}
