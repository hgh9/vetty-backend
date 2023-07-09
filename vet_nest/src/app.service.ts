import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ExceptionService } from './exception/exception.service';
import { Command } from './app.controller';
import { NotEnoughParameterError } from '../util/exception.util';

@Injectable()
export class AppService {
  constructor(
    private readonly config: ConfigService,
    private readonly exceptionService: ExceptionService,
  ) {}
  getHello(): string {
    return 'api test for react from nestjs server!!!!!!!!!';
  }

  exception(infoDto: Command) {
    const { id, name } = infoDto;

    if (!name) throw new NotEnoughParameterError('name');

    throw new HttpException({ result: false, message: 'hello' }, 400);

    return 'api test for react from nestjs server!!!!!!!!!';
  }
}
