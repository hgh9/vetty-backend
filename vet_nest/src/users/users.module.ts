import { Module } from '@nestjs/common';
import { DatabaseModule } from '@/database/database.module';
import { UsersController } from '@/users/users.controller';
import { UsersService } from '@/users/users.service';
import { UsersRepository } from '@/users/repository/users.repository';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, JwtService],
})
export class UsersModule {}
