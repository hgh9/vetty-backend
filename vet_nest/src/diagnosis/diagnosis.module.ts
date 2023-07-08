import { Module } from '@nestjs/common';
import { DisgnosisController } from './diagnosis.controller';

import { AppService } from '@/app.service';
import { DatabaseModule } from '@/database/database.module';
import { DiagnosisService } from './diagnosis.service';

@Module({
  imports: [DatabaseModule],
  controllers: [DisgnosisController],
  providers: [AppService, DiagnosisService],
})
export class DiagnosisModule {}
