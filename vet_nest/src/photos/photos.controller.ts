import { Body, Controller, Get, Inject, Post, Res } from '@nestjs/common';
import { PhotoService } from './photos.service';
import { Photo } from './entity/photos.entity';

@Controller('photo')
export class PhotoController {
  constructor(private photoService: PhotoService) {}

  @Post()
  async save(): Promise<boolean> {
    try {
      const result = await this.photoService.save();

      console.log(result);
      return true;
    } catch (err) {
      throw new Error(err);
    }
  }

  @Get()
  async findAll(): Promise<any> {
    return await this.photoService.findAll();
  }

  @Post()
  async postData(@Body() photo: Photo): Promise<any> {
    return await this.photoService.postData(photo);
  }
}
