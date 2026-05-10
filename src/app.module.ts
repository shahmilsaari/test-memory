import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users.module';
import { CompaniesModule } from './companies.module';

@Module({
  imports: [UsersModule, CompaniesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
