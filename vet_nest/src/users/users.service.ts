import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { User } from './entity/users.entity';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  private userRepository: Repository<User>;
  constructor(
    @Inject('DATA_SOURCE')
    private readonly dataSource: DataSource, // @InjectRepository(Reservation) // private readonly reservationReposiotory: Repository<Reservation>, // @InjectRepository(Payment) // private readonly paymentReposiotory: Repository<Payment>,
  ) {
    this.userRepository = this.dataSource.getRepository(User);
  }

  async signup(createUserDto: UserDto) {
    if (!this.isCreateUserDtoValid(createUserDto)) {
      throw new HttpException('Invalid user data', HttpStatus.BAD_REQUEST);
    }
    if (await this.isUserDuplicate(createUserDto.email)) {
      throw new HttpException('Duplicate user data', HttpStatus.BAD_REQUEST);
    }

    const newUser = this.userRepository.create(createUserDto);
    await this.userRepository.save(newUser);
    return newUser;
  }

  private async isUserDuplicate(email) {
    return !!(await this.userRepository.findOneBy({ email }));
  }

  private isCreateUserDtoValid(body: UserDto) {
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
