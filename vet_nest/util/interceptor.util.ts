import {
  CallHandler,
  ExecutionContext,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

export class CustomInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    console.log('Before...');
    return handler.handle().pipe(
      map(
        (data) => console.log('interceptor:', data),
        // data.map((item: Command) => {
        //   console.log('After....');
        //   const res = {
        //     ...item,
        //     id: item.id,
        //     name: item.name,
        //   };
        //   delete res.id, delete res.name;
        //   return res;
        // }),
      ),
    );
  }
}

export class LoggerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const method = req.method;
    const url = req.url;
    const now = Date.now();
    return handler.handle().pipe(
      map((data) => {
        Logger.log(
          `${method} ${url} ${Date.now() - now}ms`,
          context.getClass().name,
        );
        return data;
      }),
    );
  }
}
