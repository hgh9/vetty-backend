import { Controller, Post, HttpException, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private UsersService: UsersService) {}

  @Post('signup')
  async signup(@Body() createUserDto) {
    const result = await this.UsersService.signup(createUserDto).catch((error) => {
      throw new HttpException({ result: false, message: error.message }, 400);
    });

    return { result: result, code: 200, message: '/signup' };
  }

  @Post('login')
  async login(@Body() loginUserDto) {
    const result = await this.UsersService.login(loginUserDto).catch((error) => {
      throw new HttpException({ result: false, message: error.message }, 400);
    });

    return { result: result, code: 200, message: '/login' };
  }
}
