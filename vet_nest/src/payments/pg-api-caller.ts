import { Injectable } from "@nestjs/common";
import { IFakePgApi } from "./payments-service.interface";

@Injectable()
export class PgApiCaller implements IFakePgApi
{
  constructor() {
    
  }
  async pay(createPaymentDto: any): Promise<any> {
    return null;
  }

  async cancelPayment(uuid: string): Promise<any> {
    return null;
  }
}