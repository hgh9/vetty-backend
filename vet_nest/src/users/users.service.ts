import { Injectable } from '@nestjs/common';
import { User } from './entity/users.entity';
import { CreateUserDto, LoginUserDto, UserDto } from './dto/user.dto';
import { UsersRepository } from './repository/users.repository';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signup(createUserDto: CreateUserDto) {
    if (!this.isCreateUserDtoValid(createUserDto)) {
      throw new Error('invalid user data');
    }
    if (await this.usersRepository.isUserDuplicate(createUserDto.email)) {
      throw new Error('Duplicate user data');
    }

    return await this.usersRepository.createUser(createUserDto);
  }

  async login(loginUserDto: LoginUserDto) {
    const loginUser: User =
      await this.usersRepository.findOneByEmailAndPassword(loginUserDto);

    if (!loginUser) {
      throw new Error('Wrong user data');
    }

    return {
      id: loginUser.id,
      email: loginUser.email,
      userName: loginUser.userName,
      phoneNumber: loginUser.phoneNumber,
      token: this.generateToken(loginUser.email),
    };
  }

  public verifyToken(token: string) {
    return !!this.jwtService.verify(token);
  }

  private generateToken(email) {
    return this.jwtService.sign(email);
  }

  private isCreateUserDtoValid(body: CreateUserDto) {
    return (
      this.isEmailValid(body.email) &&
      this.isUserNameValid(body.userName) &&
      this.isPasswordValid(body.password) &&
      this.isPhoneNumberValid(body.phoneNumber)
    );
  }

  private isEmailValid(email: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private isPasswordValid(password: string) {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,16}$/;
    return passwordRegex.test(password);
  }

  private isUserNameValid(userName: string) {
    const koreanNameRegex = /^[가-힣]{2,6}$/;
    return koreanNameRegex.test(userName);
  }

  private isPhoneNumberValid(phoneNumber: string) {
    const phoneNumberRegex = /^01\d{9}$/;
    return phoneNumberRegex.test(phoneNumber);
  }
}
