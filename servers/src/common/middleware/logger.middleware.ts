import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
/**
 * 所有请求触发之前走的公共日志输出方法
 */
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const now = Date.now();
    console.log(`接口${req.baseUrl}收到${req.method}请求参数：`);
    switch (req.method) {
      case 'GET':
        if (Object.keys(req.query).length > 0)
          console.log("req.query",req.query);
        break;
      case 'POST': console.log("req.body",req.body);
      break;
      case 'PATCH':
        console.log("req.params",req.params)
        console.log("req.body",req.body);
        break;
      case 'DELETE':
          console.log("req.params",req.params)
          break;
      default:
        break;
    }
    console.log('耗时'+(Date.now() - now)+'ms');
    
    next();

  }
}
