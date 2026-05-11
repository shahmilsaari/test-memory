import { Body, Controller, Get, Post } from '@nestjs/common';
import { UuidParam } from '../../common/decorators/uuid-param.decorator';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { CompanyResponseDto } from './dto/company-response.dto';

@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Post()
  create(@Body() dto: CreateCompanyDto): Promise<CompanyResponseDto> {
    return this.companiesService.create(dto);
  }

  @Get()
  list(): Promise<CompanyResponseDto[]> {
    return this.companiesService.list();
  }

  @Get(':id')
  findOne(@UuidParam('id') id: string): Promise<CompanyResponseDto> {
    return this.companiesService.findOne(id);
  }
}
