import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Photo } from './entity/photos.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PhotoService {
  constructor(
    @InjectRepository(Photo)
    private photoRepository: Repository<Photo>,
  ) {}

  async save(): Promise<boolean> {
    const result = this.photoRepository
      .createQueryBuilder('photo')
      .insert()
      .into(Photo)
      .values([
        {
          name: 'helllo',
          description: 'helloworld',
          filename: 'hello',
          views: 12,
          isPublished: false,
        },
        {
          name: 'world',
          description: 'hello descript',
          filename: 'hello',
          views: 12,
          isPublished: true,
        },
      ])
      .execute();

    return true;
  }

  async findAll(): Promise<Photo[]> {
    return this.photoRepository.find();
  }

  async postData(photo: Photo): Promise<any> {
    const data = this.photoRepository.save(photo);
    console.log(data);
    return data;
  }
}
