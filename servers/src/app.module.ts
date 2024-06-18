import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { AuthModule } from './auth/auth.module';
import { PalModule } from './pal/pal.module';
@Module({
  imports: [ PalModule,UserModule, MongooseModule.forRoot('mongodb://127.0.0.1:27017/oncepal'), AuthModule],
  controllers: [AppController],
  providers: [AppService],
  
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    //全局日志监听
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('user','pal','auth');
  }
}
