import { Payment } from "./entity/payments.entity";
export interface IPaymentService {
  getPaymentsByReservationId(reservationId: string): Promise<Payment[]>;
  pay(createPaymentDto: object): Promise<Payment>;
  cancelPayment(paymentId: number): Promise<Payment>;
  cancelPayments(paymentId: number[]): Promise<Payment[]>;
}

export interface IFakePgApi {
  pay(createPgApiDto: object);
  cancel(): any;
}