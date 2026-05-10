import { Inject } from '@nestjs/common';
import { COMPANY_REPOSITORY } from '../../../domain/repositories/company.repository';
import type { CompanyRepository } from '../../../domain/repositories/company.repository';
import { CompanyResponseDto } from '../../dtos/companies/company-response.dto';

export class GetCompanyUseCase {
  constructor(
    @Inject(COMPANY_REPOSITORY) private readonly companyRepository: CompanyRepository,
  ) {}

  async execute(id: string): Promise<CompanyResponseDto> {
    const company = await this.companyRepository.findById(id);
    if (!company) throw new Error('Company not found');

    return { id: company.id, name: company.name, email: company.email, createdAt: company.createdAt };
  }
}
