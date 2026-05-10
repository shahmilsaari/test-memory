import { Module } from '@nestjs/common';
import { COMPANY_REPOSITORY } from './domain/repositories/company.repository';
import { InMemoryCompanyRepository } from './infrastructure/database/repositories/in-memory-company.repository';
import { CreateCompanyUseCase } from './application/use-cases/companies/create-company.use-case';
import { GetCompanyUseCase } from './application/use-cases/companies/get-company.use-case';
import { ListCompaniesUseCase } from './application/use-cases/companies/list-companies.use-case';
import { CompaniesController } from './interfaces/controllers/companies.controller';

@Module({
  controllers: [CompaniesController],
  providers: [
    { provide: COMPANY_REPOSITORY, useClass: InMemoryCompanyRepository },
    CreateCompanyUseCase,
    GetCompanyUseCase,
    ListCompaniesUseCase,
  ],
})
export class CompaniesModule {}
