import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('payments')
@ApiTags('Payments')
export class PaymentsController {}
