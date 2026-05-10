import { Inject } from '@nestjs/common';
import { COMPANY_REPOSITORY } from '../../../domain/repositories/company.repository';
import type { CompanyRepository } from '../../../domain/repositories/company.repository';
import { CompanyResponseDto } from '../../dtos/companies/company-response.dto';

export class ListCompaniesUseCase {
  constructor(
    @Inject(COMPANY_REPOSITORY) private readonly companyRepository: CompanyRepository,
  ) {}

  async execute(): Promise<CompanyResponseDto[]> {
    const companies = await this.companyRepository.findAll();
    return companies.map((c) => ({ id: c.id, name: c.name, email: c.email, createdAt: c.createdAt }));
  }
}
