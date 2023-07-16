import { Module } from '@nestjs/common';
import { DatabaseModule } from '@/database/database.module';
import { PaymentsController } from '@/payments/payments.controller';
import { PaymentsService } from '@/payments/payments.service';
import { PaymentsRepository } from '@/payments/repository/payments.repository';
import { HttpModule } from '@nestjs/axios';
import { PgApiCaller } from './pg-api-caller';

@Module({
  imports: [DatabaseModule, HttpModule],
  controllers: [PaymentsController],
  providers: [
    PaymentsService, 
    PaymentsRepository,
    PgApiCaller
  ],
})
export class PaymentsModule {}
