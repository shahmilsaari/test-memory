import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateCompanyUseCase } from '../../application/use-cases/companies/create-company.use-case';
import { GetCompanyUseCase } from '../../application/use-cases/companies/get-company.use-case';
import { ListCompaniesUseCase } from '../../application/use-cases/companies/list-companies.use-case';
import { CreateCompanyDto } from '../../application/dtos/companies/create-company.dto';

@Controller('companies')
export class CompaniesController {
  constructor(
    private readonly createCompany: CreateCompanyUseCase,
    private readonly getCompany: GetCompanyUseCase,
    private readonly listCompanies: ListCompaniesUseCase,
  ) {}

  @Post()
  create(@Body() dto: CreateCompanyDto) {
    return this.createCompany.execute(dto);
  }

  @Get()
  list() {
    return this.listCompanies.execute();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.getCompany.execute(id);
  }
}
