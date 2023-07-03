import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  HttpException,
  Query,
  Body,
} from '@nestjs/common';
import { PetsService } from './pets.service';

@Controller('pets')
export class PetsController {
  constructor(private PetsService: PetsService) {}

  @Get()
  async listPets(@Query('userId') userId: number) {
    const result = await this.PetsService.listPet(userId).catch((error) => {
      if (error.message === 'userId is required') {
        throw new HttpException({ result: false, message: error.message }, 400);
      }
    });

    return { result: result, code: 200, message: '/pets' };
    // TODO: general response class
  }

  @Post()
  async addPet(@Body() addPetDto) {
    const result = await this.PetsService.addPet(addPetDto).catch((error) => {
      if (error.message === 'valid pet data are required') {
        throw new HttpException({ result: false, message: error.message }, 400);
      }
    });

    return { result: result, code: 201, message: '/pets' };
  }

  @Put()
  async updatePet(@Body() updatePetDto) {
    const result = await this.PetsService.updatePet(updatePetDto).catch((error) => {
      if (error.message === 'valid pet data are required') {
        throw new HttpException({ result: false, message: error.message }, 400);
      }
    });

    return { result: result, code: 200, message: '/pets' };
  }

  @Delete()
  async deletePets(@Query('petId') petId: number) {
    const result = await this.PetsService.deletePet(petId).catch((error) => {
      if (error.message === 'petId is required') {
        throw new HttpException({ result: false, message: error.message }, 400);
      }
    });

    return { result: result, code: 200, message: '/pets' };
  }
}
