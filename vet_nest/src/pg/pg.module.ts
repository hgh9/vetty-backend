import { Module } from '@nestjs/common';
import { PgController } from './pg.controller';
import { PgService } from './pg.service';

@Module({
  imports: [],
  controllers: [PgController],
  providers: [PgService],
})
export class PgModule {}
