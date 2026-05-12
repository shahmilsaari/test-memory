import { Body, Controller, Post } from '@nestjs/common';
import { AntiPatternResponseDto } from './dto/anti-pattern-response.dto';
import { CreateAntiPatternDto } from './dto/create-anti-pattern.dto';
import { AntiPatternsService } from './anti-patterns.service';

@Controller('anti-patterns')
export class AntiPatternsController {
  constructor(private readonly antiPatternsService: AntiPatternsService) {}

  @Post('run')
  run(@Body() dto: CreateAntiPatternDto): Promise<AntiPatternResponseDto> {
    return this.antiPatternsService.run(dto);
  }
}
