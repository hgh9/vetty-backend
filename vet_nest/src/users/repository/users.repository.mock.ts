import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersRepositoryMock
{
  createUser(createUserDto) {
    return {
      id: 1,
      email: createUserDto.email,
      userName: createUserDto.userName,
      password: createUserDto.password,
      phoneNumber: createUserDto.phoneNumber,
    };
  }
  
  findOneByEmailAndPassword(loginUserDto) {
    const validUser =
      loginUserDto.email === 'honggildong@gmail.com' &&
      loginUserDto.password === 'qwer1234';
    
    const userInfo = {
      id: 1,
      email: loginUserDto.email,
      userName: '홍길동',
      password: loginUserDto.password,
      phoneNumber: '01012345678',
    };
    
    return validUser ? userInfo : false;
  }
  
  isUserDuplicate(email) {
    const emailList = [
      'honggildong@github.io',
      'honggildong@gmail.com',
      'honggildong@univ.ac.kr',
      'unique@gmail.com',
    ];
    return !emailList.includes(email);
  }
}