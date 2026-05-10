import { Inject } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Company } from '../../../domain/entities/company.entity';
import { COMPANY_REPOSITORY } from '../../../domain/repositories/company.repository';
import type { CompanyRepository } from '../../../domain/repositories/company.repository';
import { CreateCompanyDto } from '../../dtos/companies/create-company.dto';
import { CompanyResponseDto } from '../../dtos/companies/company-response.dto';

export class CreateCompanyUseCase {
  constructor(
    @Inject(COMPANY_REPOSITORY) private readonly companyRepository: CompanyRepository,
  ) {}

  async execute(dto: CreateCompanyDto): Promise<CompanyResponseDto> {
    const existing = await this.companyRepository.findByEmail(dto.email);
    if (existing) throw new Error('Email already in use');

    const company = Company.create(randomUUID(), dto.name.trim(), dto.email.toLowerCase(), new Date());
    await this.companyRepository.save(company);

    return { id: company.id, name: company.name, email: company.email, createdAt: company.createdAt };
  }
}
