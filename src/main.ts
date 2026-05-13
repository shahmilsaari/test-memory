import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configureApp } from './bootstrap';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const settings = configureApp(app);

  await app.listen(settings.port);
}
void bootstrap();
