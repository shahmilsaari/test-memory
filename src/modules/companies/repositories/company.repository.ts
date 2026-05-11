import type { Company } from '../entities/company.entity';

export interface CompanyRepository {
  findById(id: string): Promise<Company | null>;
  findByEmail(email: string): Promise<Company | null>;
  save(company: Company): Promise<void>;
  findAll(): Promise<Company[]>;
}

export const COMPANY_REPOSITORY = Symbol('CompanyRepository');
