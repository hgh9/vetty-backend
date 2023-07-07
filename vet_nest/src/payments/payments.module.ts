import { Module } from '@nestjs/common';
import { DatabaseModule } from '@/database/database.module';
import { PaymentsController } from '@/payments/payments.controller';
import { PaymentsService } from '@/payments/payments.service';
import { PaymentsRepository } from '@/payments/repository/payments.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [PaymentsController],
  providers: [PaymentsService, PaymentsRepository],
})
export class PaymentsModule {}
