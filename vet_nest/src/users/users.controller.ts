import { Controller, Get, Query } from '@nestjs/common';
import { GetUserDto, UserDto, UserIdDto } from './dto/user.dto';

@Controller('users')
export class UsersController {
  @Get()
  async getUser(@Query() userInfo: GetUserDto) {
    try {
      return {
        result: true,
        // data: result,
        message: '예약이 완료되었습니다.',
      };
    } catch (err) {
      throw new Error(err);
    }
  }
}
