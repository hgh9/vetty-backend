import {
  Body,
  Controller,
  Get,
  Logger,
  LoggerService,
  Post,
} from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';
import { ApiBody, ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, isString } from 'class-validator';
import { ExceptionService } from './exception/exception.service';

export class Command {
  @ApiProperty({
    default: '111',
    type: 'string',
    name: 'id',
    required: true,
  })
  @IsString()
  id: string;

  @ApiProperty({
    default: 'name',
    type: 'string',
    name: 'name',
    required: false,
  })
  @IsString()
  @IsOptional()
  name: string;
}
@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);
  constructor(
    private readonly appService: AppService,
    private readonly exceptionService: ExceptionService,
    private readonly config: ConfigService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // 예외처리 예제 입니다.
  @Post('test')
  @ApiBody({ type: Command })
  exceptionTest(@Body() infoDto: Command): string {
    this.logger.verbose('exception');
    try {
      return this.appService.exception(infoDto);
    } catch (error) {
      if (error.constructor.name == 'NotEnoughParameterError') return error;
      this.exceptionService.FailedPostException();
    }
  }
}
