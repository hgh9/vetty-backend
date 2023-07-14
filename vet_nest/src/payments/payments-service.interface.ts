import { Payment } from "@/reservations/entity/payment.entity";

export interface IPaymentService {
  pay(): Promise<Payment>;
  cancelPayment(): Promise<Payment>;
  cancelPayments(): Promise<Payment[]>;
}