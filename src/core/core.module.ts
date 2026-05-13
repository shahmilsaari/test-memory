import { Global, Module } from '@nestjs/common';
import { CorrelationIdInterceptor } from '../common/interceptors/correlation-id.interceptor';
import { HttpExceptionFilter } from '../common/filters/http-exception.filter';

@Global()
@Module({
  providers: [CorrelationIdInterceptor, HttpExceptionFilter],
  exports: [CorrelationIdInterceptor, HttpExceptionFilter],
})
export class CoreModule {}
