import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ExceptionService } from './exception/exception.service';

@Injectable()
export class AppService {
  constructor(
    private readonly config: ConfigService,
    private readonly exceptionService: ExceptionService,
  ) {}
  getHello(): string {
    return 'api test for react from nestjs server!!!!!!!!!';
  }

  exception() {
    this.exceptionService.NotEnoughParameter('data');
    return 'api test for react from nestjs server!!!!!!!!!';
  }
}
