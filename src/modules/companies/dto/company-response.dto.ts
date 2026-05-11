import { Company } from '../entities/company.entity';

export class CompanyResponseDto {
  id: string;
  name: string;
  email: string;
  createdAt: Date;

  static fromEntity(company: Company): CompanyResponseDto {
    return {
      id: company.id,
      name: company.name,
      email: company.email,
      createdAt: company.createdAt,
    };
  }
}
