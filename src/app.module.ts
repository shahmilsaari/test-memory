import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CoreModule } from './core/core.module';
import appConfig from './config/app.config';
import { validateEnv } from './config/env.validation';
import { CompaniesModule } from './modules/companies/companies.module';
import { HealthModule } from './modules/health/health.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
      validate: validateEnv,
    }),
    CoreModule,
    HealthModule,
    UsersModule,
    CompaniesModule,
  ],
})
export class AppModule {}
