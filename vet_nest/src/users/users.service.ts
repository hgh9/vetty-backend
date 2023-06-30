import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from './entity/users.entity';
import { CreateUserDto, LoginUserDto, UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  private userRepository: Repository<User>;
  jwtService: any;
  constructor(
    @Inject('DATA_SOURCE')
    private readonly dataSource: DataSource, // @InjectRepository(Reservation) // private readonly reservationReposiotory: Repository<Reservation>, // @InjectRepository(Payment) // private readonly paymentReposiotory: Repository<Payment>,
  ) {
    this.userRepository = this.dataSource.getRepository(User);
  }

  async signup(createUserDto: CreateUserDto) {
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

  async login(loginUserDto: LoginUserDto) {
    const loginUser: User = await this.userRepository.findOneBy({
      email: loginUserDto.email,
      password: loginUserDto.password,
    });

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

  private async isUserDuplicate(email) {
    return !!(await this.userRepository.findOneBy({ email }));
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
