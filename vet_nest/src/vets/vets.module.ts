import { Module } from '@nestjs/common';
import { VetsController } from './vets.controller';

@Module({
  controllers: [VetsController]
})
export class VetsModule {}
