import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user.service';

describe('Sign up', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  test('Email Address Format', () => {
    const validate = service.validateEmail;

    // PASS
    const THREE_LETTER_TLD = 'honggildong@gmail.com';
    const TWO_LETTER_TLD = 'honggildong@github.io';
    const COUNTRY_CODE_TLD = 'honggildong@univ.ac.kr';
    expect(validate(THREE_LETTER_TLD)).toBeTruthy();
    expect(validate(TWO_LETTER_TLD)).toBeTruthy();
    expect(validate(COUNTRY_CODE_TLD)).toBeTruthy();

    // FAIL
    const NO_AT_SIGN = 'honggildonggmail.com';
    const NO_TLD = 'honggildong@gmailcom';
    expect(validate(NO_AT_SIGN)).toBeFalsy();
    expect(validate(NO_TLD)).toBeFalsy();
  });

  test('Password Format', () => {
    const validate = service.validatePassword;

    // PASS
    const WITHOUT_SPECIAL = '1q2w3e4r';
    const WITH_SPECIAL = '!1q2w3e4r@';
    expect(validate(WITHOUT_SPECIAL)).toBeTruthy();
    expect(validate(WITH_SPECIAL)).toBeTruthy();

    // FAIL
    const LESS_8 = '1q2w3e4';
    const MORE_16 = '1q2w3e4r5t6y7u8i9';
    const NO_ALPHABET = '12345678';
    const NO_NUMBER = 'qwertyui';
    expect(validate(LESS_8)).toBeFalsy();
    expect(validate(MORE_16)).toBeFalsy();
    expect(validate(NO_ALPHABET)).toBeFalsy();
    expect(validate(NO_NUMBER)).toBeFalsy();
  });

  test('Name Format', () => {
    const validate = service.validateName;

    // PASS
    const HONG_GIL_DONG = '홍길동';
    const TWO_LETTER = '허균';
    const SIX_LETTER = '홍길동홍길동';
    expect(validate(HONG_GIL_DONG)).toBeTruthy();
    expect(validate(TWO_LETTER)).toBeTruthy();
    expect(validate(SIX_LETTER)).toBeTruthy();

    // FAIL
    const ALPHABET_NAME = 'John Doe';
    const NUMBER_INCLUDED = '홍길동1';
    const WHITE_SPACE = '홍 길 동';
    const ONE_LETTER = '홍';
    const SEVEN_LETTER = '홍길동홍길동홍';
    const NO_VOWEL = 'ㅎㄱㄷ';
    const NO_CONSONANT = 'ㅗㅣㅗ';
    expect(validate(ALPHABET_NAME)).toBeFalsy();
    expect(validate(NUMBER_INCLUDED)).toBeFalsy();
    expect(validate(WHITE_SPACE)).toBeFalsy();
    expect(validate(ONE_LETTER)).toBeFalsy();
    expect(validate(SEVEN_LETTER)).toBeFalsy();
    expect(validate(NO_VOWEL)).toBeFalsy();
    expect(validate(NO_CONSONANT)).toBeFalsy();
  });
});
