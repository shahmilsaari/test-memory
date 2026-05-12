import { Body, Controller, Get, Post } from '@nestjs/common';
import { IsNotEmpty, IsString } from 'class-validator';
import { BadEntity } from './bad.entity';
import { BadService } from './bad.service';

class CreateBadDto {
  @IsString()
  @IsNotEmpty()
  name!: string;
}

class BadResponseDto {
  id!: string;
  name!: string;
  createdAt!: Date;

  static fromEntity(entity: BadEntity): BadResponseDto {
    return {
      id: entity.id,
      name: entity.name,
      createdAt: entity.createdAt,
    };
  }
}

@Controller('bad')
export class BadController {
  constructor(private readonly badService: BadService) {}

  @Post()
  create(@Body() dto: CreateBadDto): BadResponseDto {
    return BadResponseDto.fromEntity(this.badService.create(dto.name));
  }

  @Get()
  list(): BadResponseDto[] {
    return this.badService.list().map(BadResponseDto.fromEntity);
  }
}
