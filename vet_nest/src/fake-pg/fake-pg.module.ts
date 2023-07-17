import { Module } from '@nestjs/common';
import { FakePgController as FakePgController } from './fake-pg.controller';

@Module({
  imports: [],
  controllers: [FakePgController]
})
export class FakePgModule {}
