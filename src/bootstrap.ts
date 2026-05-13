import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigType, ConfigService } from '@nestjs/config';
import { CorrelationIdInterceptor } from './common/interceptors/correlation-id.interceptor';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import appConfig from './config/app.config';

export const configureApp = (
  app: INestApplication,
): ConfigType<typeof appConfig> => {
  const configService = app.get(ConfigService);
  const settings =
    configService.getOrThrow<ConfigType<typeof appConfig>>('app');

  app.setGlobalPrefix('api/v1');
  app.enableCors({
    origin: settings.corsOrigins,
    credentials: true,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
      transform: true,
      whitelist: true,
    }),
  );
  app.useGlobalInterceptors(app.get(CorrelationIdInterceptor));
  app.useGlobalFilters(app.get(HttpExceptionFilter));

  return settings;
};
