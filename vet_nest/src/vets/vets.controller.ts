import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('vets')
@ApiTags('Vets')
export class VetsController {}
