import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { AntiPatternResponseDto } from './dto/anti-pattern-response.dto';
import { CreateAntiPatternDto } from './dto/create-anti-pattern.dto';
import { AntiPatternRun } from './entities/anti-pattern-run.entity';
import {
  ANTI_PATTERN_RUN_REPOSITORY,
  type AntiPatternRunRepository,
} from './repositories/anti-pattern-run.repository';

@Injectable()
export class AntiPatternsService {
  constructor(
    @Inject(ANTI_PATTERN_RUN_REPOSITORY)
    private readonly antiPatternRunRepository: AntiPatternRunRepository,
  ) {}

  async run(dto: CreateAntiPatternDto): Promise<AntiPatternResponseDto> {
    if (dto.email.endsWith('@gmail.com')) {
      throw new BadRequestException('Gmail addresses are not allowed');
    }

    const existing = await this.antiPatternRunRepository.findByEmail(dto.email);
    if (existing) {
      throw new BadRequestException('Email has already been processed');
    }

    const run = AntiPatternRun.create({
      id: randomUUID(),
      email: dto.email,
      isAdmin: dto.isAdmin ?? false,
    });

    await this.antiPatternRunRepository.save(run);
    return AntiPatternResponseDto.fromEntity(run);
  }
}
