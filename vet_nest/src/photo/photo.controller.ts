import { Body, Controller, Get, Inject, Post, Res } from '@nestjs/common';
import { PhotoService } from './photo.service';
import { Photo } from './entity/photo.entity';

@Controller('photo')
export class PhotoController {
  constructor(private photoService: PhotoService) {}

  @Get()
  async findAll(): Promise<any> {
    return await this.photoService.findAll();
  }

  @Post()
  async postData(@Body() photo: Photo): Promise<any> {
    return await this.photoService.postData(photo);
  }
}
