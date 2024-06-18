import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  RequestTimeoutException,
} from '@nestjs/common';
import { Observable, TimeoutError, throwError } from 'rxjs';
import { catchError, map, timeout } from 'rxjs/operators';
import { Response, Request } from 'express';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

    const res = context.switchToHttp().getResponse<Response>();
    const {method} = context.switchToHttp().getRequest<Request>()
    console.log(res.statusCode);
    
    // console.log("res",res.getHeaders()); console.log("res",res.getHeaders());

    return next.handle().pipe( map(data => {

        const r = {

          data,
          code: res.statusCode,
          message: res.statusCode == 200?'请求成功':'请求失败',
        };


        return r
      }),
      timeout(5000),
      catchError(err => {
        if (err instanceof TimeoutError) {
          return throwError(() => new RequestTimeoutException());
        }
        return throwError(() => err);
      }),
     
    );


  }
}