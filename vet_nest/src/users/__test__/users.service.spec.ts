import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users.service';
import { JwtService } from '@nestjs/jwt';
import { User, UserLevel } from '../entity/users.entity';
import { UsersRepository } from '../repository/users.repository';
import { UsersRepositoryMock } from '../repository/users.repository.mock';

const createUserDto = {
  email: 'honggildong@gmail.com',
  userName: '홍길동',
  password: 'qwer1234',
  phoneNumber: '01012345678',
};
const createdUser = {
  id: 1,
  email: 'honggildong@gmail.com',
  userName: '홍길동',
  password: 'qwer1234',
  phoneNumber: '01012345678',
};

describe('SIGN UP', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        JwtService,
        {
          provide: UsersRepository,
          useClass: UsersRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  test('invalid emails fail', async () => {
    const signupWithGivenEmail = (email) => {
      return service.signup(Object.assign({}, createUserDto, { email }));
    };

    // PASS
    const THREE_LETTER_TLD = 'honggildong@gmail.com';
    expect(await signupWithGivenEmail(THREE_LETTER_TLD)).toEqual(createdUser);

    const TWO_LETTER_TLD = 'honggildong@github.io';
    createdUser.email = TWO_LETTER_TLD;
    expect(await signupWithGivenEmail(TWO_LETTER_TLD)).toEqual(createdUser);

    const COUNTRY_CODE_TLD = 'honggildong@univ.ac.kr';
    createdUser.email = COUNTRY_CODE_TLD;
    expect(await signupWithGivenEmail(COUNTRY_CODE_TLD)).toEqual(createdUser);

    createdUser.email = 'honggildong@gmail.com';

    // FAIL
    const NO_AT_SIGN = 'honggildonggmail.com';
    try {
      await signupWithGivenEmail(NO_AT_SIGN);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }

    const NO_TLD = 'honggildong@gmailcom';
    try {
      await signupWithGivenEmail(NO_TLD);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }

    const TOTAL_ASSERTIONS = 5;
    expect.assertions(TOTAL_ASSERTIONS);
  });

  test('invalid passwords fail', async () => {
    const signupWithGivenPassword = (password) => {
      return service.signup(Object.assign({}, createUserDto, { password }));
    };

    // PASS
    const WITHOUT_SPECIAL = '1q2w3e4r';
    createdUser.password = WITHOUT_SPECIAL;
    expect(await signupWithGivenPassword(WITHOUT_SPECIAL)).toEqual(createdUser);

    const WITH_SPECIAL = '!1q2w3e4r@';
    createdUser.password = WITH_SPECIAL;
    expect(await signupWithGivenPassword(WITH_SPECIAL)).toEqual(createdUser);

    createdUser.password = 'qwer1234';

    // FAIL
    const LESS_8 = '1q2w3e4';
    try {
      await signupWithGivenPassword(LESS_8);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }

    const MORE_16 = '1q2w3e4r5t6y7u8i9';
    try {
      await signupWithGivenPassword(MORE_16);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }

    const NO_ALPHABET = '12345678';
    try {
      await signupWithGivenPassword(NO_ALPHABET);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }

    const NO_NUMBER = 'qwertyui';
    try {
      await signupWithGivenPassword(NO_NUMBER);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }

    const TOTAL_ASSERTIONS = 6;
    expect.assertions(TOTAL_ASSERTIONS);
  });

  test('invalid user names fail', async () => {
    const signupWithGivenUserName = (userName) => {
      return service.signup(Object.assign({}, createUserDto, { userName }));
    };

    // PASS
    const HONG_GIL_DONG = '홍길동';
    expect(await signupWithGivenUserName(HONG_GIL_DONG)).toEqual(createdUser);

    const TWO_LETTER = '허균';
    createdUser.userName = '허균';
    expect(await signupWithGivenUserName(TWO_LETTER)).toEqual(createdUser);

    const SIX_LETTER = '홍길동홍길동';
    createdUser.userName = '홍길동홍길동';
    expect(await signupWithGivenUserName(SIX_LETTER)).toEqual(createdUser);

    createdUser.userName = '홍길동';

    // FAIL
    const ALPHABET_NAME = 'JohnDoe';
    try {
      await signupWithGivenUserName(ALPHABET_NAME);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }

    const NUMBER_INCLUDED = '홍길동1';
    try {
      await signupWithGivenUserName(NUMBER_INCLUDED);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }

    const WHITE_SPACE = '홍 길 동';
    try {
      await signupWithGivenUserName(WHITE_SPACE);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }

    const ONE_LETTER = '홍';
    try {
      await signupWithGivenUserName(ONE_LETTER);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }

    const SEVEN_LETTER = '홍길동홍길동홍';
    try {
      await signupWithGivenUserName(SEVEN_LETTER);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }

    const NO_VOWEL = 'ㅎㄱㄷ';
    try {
      await signupWithGivenUserName(NO_VOWEL);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }

    const NO_CONSONANT = 'ㅗㅣㅗ';
    try {
      await signupWithGivenUserName(NO_CONSONANT);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }

    const TOTAL_ASSERTIONS = 10;
    expect.assertions(TOTAL_ASSERTIONS);
  });

  test('invalid phone numbers fail', async () => {
    const signupWithGivenPhoneNumber = (phoneNumber) => {
      return service.signup(Object.assign({}, createUserDto, { phoneNumber }));
    };

    // PASS
    const START_010 = '01012345678';
    expect(await signupWithGivenPhoneNumber(START_010)).toEqual(createdUser);

    const START_01X = '01612345678';
    createdUser.phoneNumber = START_01X;
    expect(await signupWithGivenPhoneNumber(START_01X)).toEqual(createdUser);

    createdUser.phoneNumber = '01012345678';

    // FAIL
    const START_NOT_01 = '12345678910';
    try {
      await signupWithGivenPhoneNumber(START_NOT_01);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }

    const NON_11 = '0102345678';
    try {
      await signupWithGivenPhoneNumber(NON_11);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }

    const TOTAL_ASSERTIONS = 4;
    expect.assertions(TOTAL_ASSERTIONS);
  });

  test('duplicate user data fail', async () => {
    const existingUser = {
      id: 1,
      email: 'duplicate@gmail.com',
      password: '12345678!',
      userName: '테스',
      phoneNumber: '01012345678',
      level: UserLevel.CUSTOMER,
    };

    // PASS
    const UNIQUE_EMAIL = Object.assign({}, createUserDto, {
      email: 'unique@gmail.com',
    });
    const uniqueUser = Object.assign({}, createdUser, {
      email: 'unique@gmail.com',
    });
    expect(await service.signup(UNIQUE_EMAIL)).toEqual(uniqueUser);

    const DUPLICATE_USERNAME = Object.assign({}, createUserDto, {
      userName: existingUser.userName,
    });
    const sameNameUser = Object.assign({}, createdUser, {
      userName: existingUser.userName,
    });
    expect(await service.signup(DUPLICATE_USERNAME)).toEqual(sameNameUser);

    const DUPLICATE_PHONENUMBER = Object.assign({}, createUserDto, {
      phoneNumber: existingUser.phoneNumber,
    });
    const samePhoneUser = Object.assign({}, createdUser, {
      phoneNumber: existingUser.phoneNumber,
    });
    expect(await service.signup(DUPLICATE_PHONENUMBER)).toEqual(samePhoneUser);

    // FAIL
    try {
      const DUPLICATE_EMAIL = Object.assign({}, createUserDto, {
        email: 'duplicate@gmail.com',
      });
      await service.signup(DUPLICATE_EMAIL);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }

    const TOTAL_ASSERTIONS = 4;
    expect.assertions(TOTAL_ASSERTIONS);
  });
});

describe('Login', () => {
  let service: UsersService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
        {
          provide: UsersRepository,
          useClass: UsersRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
  });

  test('invalid user data fail', async () => {
    const findUserData = {
      id: 1,
      email: 'honggildong@gmail.com',
      userName: '홍길동',
      password: '12345678!',
      phoneNumber: '01012345678',
      level: UserLevel.CUSTOMER,
    };
    const loginReturnData = {
      id: 1,
      email: 'honggildong@gmail.com',
      userName: '홍길동',
      phoneNumber: '01012345678',
      token: jwtService.sign('honggildong@gmail.com'),
    };

    // PASS
    const correctLoginData = {
      email: 'honggildong@gmail.com',
      password: 'qwer1234',
    };
    const loginUser = await service.login(correctLoginData);
    expect(loginUser).toEqual(loginReturnData);

    // FAIL
    const falseEmailLoginData = {
      email: 'hayashasong@gmail.com',
      password: 'qwer1234',
    };
    try {
      await service.login(falseEmailLoginData);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }

    const falsePasswordLoginData = {
      email: 'honggildong@gmail.com',
      password: '4321rewq',
    };
    try {
      await service.login(falsePasswordLoginData);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }

    const TOTAL_ASSERTIONS = 3;
    expect.assertions(TOTAL_ASSERTIONS);
  });
});
