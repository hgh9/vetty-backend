import { HttpException, Injectable } from '@nestjs/common';

@Injectable()
export class ExceptionsService {
  //Service 부분 또는 repository 부분에서 발생되는 비지니스 에러부분입니다.
  //try catch로 묶어서
  NotEnoughParameter(data = null, statusCode = 300) {
    throw new HttpException(
      {
        result: {
          message: '파라미터가 잘못되었거나 부족합니다.', //한글로된 메세지
          error: 'Internal Server Error', //영어로된 메세지
          data: data,
        },
      },
      statusCode,
    );
  }

  UnknownException(data = null, statusCode = 400) {
    throw new HttpException(
      {
        result: {
          ok: false,
          message: '알수없는 예외가 발생했습니다.', //한글로된 메세지
          error: 'Unknown Error', //영어로된 메세지
          data: data,
        },
      },
      statusCode,
    );
  }

  FailedPostException(data = null, statusCode = 300) {
    throw new HttpException(
      {
        result: {
          message: '디비 삽입에 실패했습니다.', //한글로된 메세지
          error: 'Failed Insert DB', //영어로된 메세지
          data: data,
        },
      },
      statusCode,
    );
  }
}
