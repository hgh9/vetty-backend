import { Module } from '@nestjs/common';
import { DatabaseModule } from '@/database/database.module';
import { PaymentsController } from '@/payments/payments.controller';
import { PaymentsService } from '@/payments/payments.service';
import { PaymentsRepository } from '@/payments/repository/payments.repository';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [DatabaseModule, HttpModule],
  controllers: [PaymentsController],
  providers: [PaymentsService, PaymentsRepository],
})
export class PaymentsModule {}
