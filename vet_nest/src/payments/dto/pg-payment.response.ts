export class PgPaymentResponse {
  uuid: string;
  resultCode: string;
  cardNumber: string;
  amount: number;

  constructor(p?: any) {
    // p = p ?? {};
    // this.uuid = p?.uuid;
    // this.resultCode = 'OK';
  }
}