import { Injectable } from '@nestjs/common';
import { Company } from '../entities/company.entity';
import type { CompanyRepository } from './company.repository';

@Injectable()
export class InMemoryCompanyRepository implements CompanyRepository {
  private readonly store = new Map<string, Company>();

  findById(id: string): Promise<Company | null> {
    return Promise.resolve(this.store.get(id) ?? null);
  }

  findByEmail(email: string): Promise<Company | null> {
    const company =
      Array.from(this.store.values()).find(
        (company) => company.email === email.toLowerCase(),
      ) ?? null;

    return Promise.resolve(company);
  }

  save(company: Company): Promise<void> {
    this.store.set(company.id, company);
    return Promise.resolve();
  }

  findAll(): Promise<Company[]> {
    return Promise.resolve(Array.from(this.store.values()));
  }
}
