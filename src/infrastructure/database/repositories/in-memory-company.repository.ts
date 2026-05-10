import { Company } from '../../../domain/entities/company.entity';
import type { CompanyRepository } from '../../../domain/repositories/company.repository';

export class InMemoryCompanyRepository implements CompanyRepository {
  private readonly store = new Map<string, Company>();

  async findById(id: string): Promise<Company | null> {
    return this.store.get(id) ?? null;
  }

  async findByEmail(email: string): Promise<Company | null> {
    for (const company of this.store.values()) {
      if (company.email === email.toLowerCase()) return company;
    }
    return null;
  }

  async save(company: Company): Promise<void> {
    this.store.set(company.id, company);
  }

  async findAll(): Promise<Company[]> {
    return Array.from(this.store.values());
  }
}
