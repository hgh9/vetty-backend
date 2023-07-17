import { SearchOptions } from "redis";
import { Payment } from "./entity/payments.entity";
import { SearchPaymentDto } from "./dto/search-payment.dto";
import { PgCancelPaymentRequest } from "./dto/pg-cancel-payment.request";
import { PgCancelPaymentResponse } from "./dto/pg-cancel-payment.response";
import { PgPaymentResponse } from "./dto/pg-payment.response";
export interface IPaymentService {
  getPaymentsByUserId(userId: number, searchOption: SearchPaymentDto): Promise<Payment[]>;
  // getPaymentsByVetId(vetId: number, searchOption: SearchPaymentDto);
  // getPaymentsByReservationId(reservationId: number): Promise<Payment[]>;
  // createPayment(createPaymentDto: object): Promise<Payment>;
  cancelPayment(paymentId: number): Promise<Payment>;
  cancelPaymentsByReservationId(reservationId: number): Promise<Payment[]> 
}

export interface IFakePgApi {
  pay(createPaymentDto: any): Promise<PgPaymentResponse>,
  cancelPayment(uuid: string): Promise<PgCancelPaymentResponse> 
}