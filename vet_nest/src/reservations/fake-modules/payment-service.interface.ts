
export interface IPaymentService {
    cancelPayment(appUuid: string): Promise<boolean>;
}