import { Module } from '@nestjs/common';
import { PhotoController } from './photos.controller';
import { PhotoService } from './photos.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Photo } from './entity/photos.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Photo])],
  providers: [PhotoService],
  controllers: [PhotoController],
})
export class PhotoModule {}
