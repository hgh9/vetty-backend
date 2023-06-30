import { Module } from '@nestjs/common';
import { CheckController } from './check.controller';
import { CheckService } from './check.service';
import { AppService } from '@/app.service';
import { DatabaseModule } from '@/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [CheckController],
  providers: [AppService, CheckService],
})
export class CheckModule {}
