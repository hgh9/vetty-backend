export const ErrorCode = {
  NO_ERROR: 0,
  ERROR_NONE: 10,
  ERROR_NOT_ENOUGH_PARAMETERS: 20,
};

export class BaseError extends Error {
  data: any;

  constructor(data?: object, message?: string, status?: string) {
    super();
    this.data = data;
    this.message = message;
    this.stack = status;
  }
}

export class NotEnoughParameterError extends BaseError {
  constructor(data?: string) {
    super();
    this.data = {
      ErrorCode: ErrorCode.ERROR_NOT_ENOUGH_PARAMETERS,
      data,
    };
    this.message = '파라미터가 모자라요';
  }
}
export class NotExist extends BaseError {}
export class InsertFailed extends BaseError {}
export class UpdateFailed extends BaseError {}
export class AlreadyDone extends BaseError {}
export class DeleteFailed extends BaseError {}
export class CreateAccessTokenFailed extends BaseError {}
export class QueryError extends BaseError {}
export class SignOutFailed extends BaseError {}
export class getPostAddressFailed extends BaseError {}
export class FailedCreateUser extends BaseError {}
export class FailedUpload extends BaseError {}
export class NotMatchWithCode extends BaseError {}
export class FailedGetData extends BaseError {}
export class FailedSendArlimTalk extends BaseError {}
export class FailedVerifyEmail extends BaseError {}
export class FailedUpdate extends BaseError {}
export class NoFoundCookies extends BaseError {}
export class FailedSendSlackMessage extends BaseError {}
export class FailedSendMail extends BaseError {}
export class NothingChanged extends BaseError {}
export class FailedLogin extends BaseError {}
export class FailedDeleteUser extends BaseError {}
export class FailedPost extends BaseError {}
export class FailedDelete extends BaseError {}
export class FailedVerifyCode extends BaseError {}
export class FailedChangePassword extends BaseError {}
