import { PaymentMethod } from "../entity/payments.entity";

export class CreatePaymentDto {
  reservationId: number;
  method: PaymentMethod;
  cardNumber: string; 
  validPeriod: string;
  amount: number;
  currency: string;
  
  constructor() {

  }
}