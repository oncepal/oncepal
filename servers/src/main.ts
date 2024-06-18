import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseInterceptor } from './common/interceptor/response.interceptor';
import { HttpExceptionFilter } from './common/filter/httpException.filter';
import { ValidationPipe } from '@nestjs/common';
async function starter() {
  const app = await NestFactory.create(AppModule);
 // 全局参数自动过滤
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
  }));
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new ResponseInterceptor())
  await app.listen(3001);
}
starter();
