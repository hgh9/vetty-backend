import { Payment } from "./entity/payments.entity";
export interface IPaymentService {
  getPaymentsByReservationId(reservationId: number): Promise<Payment[]>;
  pay(createPaymentDto: object): Promise<Payment>;
  cancelPayment(paymentId: number): Promise<Payment>;
  cancelPaymentsByReservationId(reservationId: number): Promise<Payment[]> 
}

export interface IFakePgApi {
  pay(createPaymentDto: any): Promise<any>,
  cancelPayment(uuid: string): Promise<any> 
}