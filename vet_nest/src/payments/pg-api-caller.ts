import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { IFakePgApi } from "./payments-service.interface";
import { HttpModule, HttpService } from "@nestjs/axios";
import { BusinessException } from "util/exception.util";
import { PgPaymentRequest } from "./dto/pg-payment.request";
import { PgPaymentResponse } from "./dto/pg-payment.response";
import { PgCancelPaymentResponse } from "./dto/pg-cancel-payment.response";
import { PgCancelPaymentRequest } from "./dto/pg-cancel-payment.request";
import { catchError, firstValueFrom } from "rxjs";
import { AxiosError } from "axios";

@Injectable()
export class PgApiCaller implements IFakePgApi
{
  private PG_API_ADDRESS: string = 'http://localhost:3001/pg';
  constructor(private httpClient: HttpService) {
    
  }
  async pay(param: PgPaymentRequest): Promise<any> {
    //TODO: parameter 만들어져서 넘어와야 하는가? or DTO 받아서 parameter 만들어야 하는가?
    
    this.httpClient.post(`${this.PG_API_ADDRESS}/create`, param)
      .pipe()
      .subscribe({
        next: (res: any) => {
          const response = new PgPaymentResponse(res);
          return Promise.resolve(response);
        },
        error: (error: any) => {
          throw new BusinessException(error, 'PG-ERROR', '500');
        }
      });
  }

  async cancelPayment(uuid: string): Promise<PgCancelPaymentResponse> {
    const param = new PgCancelPaymentRequest();
    param.uuid = uuid;
    const { data }  = await firstValueFrom(
      await this.httpClient.patch<PgCancelPaymentResponse>(`${this.PG_API_ADDRESS}/cancel`, param).pipe(
        catchError((error: AxiosError) => {
          throw new BusinessException(error, 'PG-ERROR', '500');
        })
      ));
    console.log(`PG-API: ${JSON.stringify(data)}`);
    return Promise.resolve(data);
  }
}