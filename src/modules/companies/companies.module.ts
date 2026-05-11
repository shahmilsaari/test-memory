import { Module } from '@nestjs/common';
import { CompaniesController } from './companies.controller';
import { CompaniesService } from './companies.service';
import { COMPANY_REPOSITORY } from './repositories/company.repository';
import { InMemoryCompanyRepository } from './repositories/in-memory-company.repository';

@Module({
  controllers: [CompaniesController],
  providers: [
    CompaniesService,
    { provide: COMPANY_REPOSITORY, useClass: InMemoryCompanyRepository },
  ],
})
export class CompaniesModule {}
