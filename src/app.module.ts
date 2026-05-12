import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { validateEnv } from './config/env.validation';
import { AntiPatternsModule } from './modules/anti-patterns/anti-patterns.module';
import { CompaniesModule } from './modules/companies/companies.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: validateEnv,
    }),
    UsersModule,
    CompaniesModule,
    AntiPatternsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
