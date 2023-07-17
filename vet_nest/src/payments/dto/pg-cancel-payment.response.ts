export class PgCancelPaymentResponse {
  resultCode: string;
  uuid: string;

  constructor(p?: any) {
    p = p ?? {}; 
    this.resultCode = p?.resultCode;
    this.uuid = p?.uuid;
  }
}