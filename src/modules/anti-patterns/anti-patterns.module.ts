import { Module } from '@nestjs/common';
import { AntiPatternsController } from './anti-patterns.controller';
import { AntiPatternsService } from './anti-patterns.service';
import { ANTI_PATTERN_RUN_REPOSITORY } from './repositories/anti-pattern-run.repository';
import { InMemoryAntiPatternRunRepository } from './repositories/in-memory-anti-pattern-run.repository';

@Module({
  controllers: [AntiPatternsController],
  providers: [
    AntiPatternsService,
    {
      provide: ANTI_PATTERN_RUN_REPOSITORY,
      useClass: InMemoryAntiPatternRunRepository,
    },
  ],
})
export class AntiPatternsModule {}
