import type { AntiPatternRun } from '../entities/anti-pattern-run.entity';

export interface AntiPatternRunRepository {
  findByEmail(email: string): Promise<AntiPatternRun | null>;
  save(run: AntiPatternRun): Promise<void>;
}

export const ANTI_PATTERN_RUN_REPOSITORY = Symbol('AntiPatternRunRepository');
