import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { BaseError } from "util/exception.util";

@Catch(BaseError)
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: BaseError, host: ArgumentsHost): void {
    
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    let status = (exception.stack && parseInt(exception.stack) != Number.NaN) 
      ? parseInt(exception.stack) 
      : 500;

    response.status(status).json({
      error: exception.data,
      message: exception.message,
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
