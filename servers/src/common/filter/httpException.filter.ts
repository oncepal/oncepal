import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

/**
 * 接口异常处理公共方法
 */
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    console.log("HttpExceptionFilter pass");
    
    const ctx = host.switchToHttp();

    const response = ctx.getResponse();

    const status = exception.getStatus();

    let validMessage = '';

    const exceptionResponse: any = exception.getResponse();
   
    if (typeof exceptionResponse === 'object') {
      validMessage =
        typeof exceptionResponse.message === 'string'
          ? exceptionResponse.message
          : exceptionResponse.message[0];
    }

    const message = exception.message ? exception.message : 'Service Error';
   
    response.status(status).json({
      code: -1,
      message: validMessage || message,
      data: null,
    });
  }
}