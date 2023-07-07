import { Controller, Get, Logger, LoggerService } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);
  constructor(
    private readonly appService: AppService,
    private readonly config: ConfigService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // 예외처리 예제 입니다.
  @Get('test')
  exceptionTest(): string {
    this.logger.verbose('exception');

    return this.appService.exception();
  }
}
