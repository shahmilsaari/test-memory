import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateCompanyDto } from './dto/create-company.dto';
import { CompanyResponseDto } from './dto/company-response.dto';
import { Company } from './entities/company.entity';
import { COMPANY_REPOSITORY } from './repositories/company.repository';
import type { CompanyRepository } from './repositories/company.repository';

@Injectable()
export class CompaniesService {
  constructor(
    @Inject(COMPANY_REPOSITORY)
    private readonly companyRepository: CompanyRepository,
  ) {}

  async create(dto: CreateCompanyDto): Promise<CompanyResponseDto> {
    const existing = await this.companyRepository.findByEmail(dto.email);
    if (existing) throw new ConflictException('Email already in use');

    const company = Company.create(randomUUID(), dto.name, dto.email);
    await this.companyRepository.save(company);
    return CompanyResponseDto.fromEntity(company);
  }

  async findOne(id: string): Promise<CompanyResponseDto> {
    const company = await this.companyRepository.findById(id);
    if (!company) throw new NotFoundException('Company not found');

    return CompanyResponseDto.fromEntity(company);
  }

  async list(): Promise<CompanyResponseDto[]> {
    const companies = await this.companyRepository.findAll();
    return companies.map((company) => CompanyResponseDto.fromEntity(company));
  }
}
