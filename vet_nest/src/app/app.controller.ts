import {
  Body,
  Controller,
  Get,
  Logger,
  LoggerService,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';
import { ApiBody, ApiProperty, ApiTags } from '@nestjs/swagger';
import { IsOptional, IsString, isString } from 'class-validator';
import { ExceptionsService } from '../exceptions/exceptions.service';

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
@ApiTags('App')
export class AppController {
  private readonly logger = new Logger(AppController.name);
  constructor(
    private readonly appService: AppService,
    private readonly exceptionService: ExceptionsService,
    private readonly config: ConfigService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('helthCheck')
  healthCheck(): string {
    return 'good Health';
  }

  // 예외처리 예제 입니다.
  @Post('exceptionTest')
  @ApiBody({ type: Command })
  // @UseInterceptors(CustomInterceptor)
  exceptionTest(@Body() infoDto: Command): string {
    try {
      return this.appService.exception(infoDto);
    } catch (error) {
      console.log('hello');
      if (error.constructor.name == 'NotEnoughParameterError') return error;
      this.exceptionService.FailedPostException();
    }
  }
}
