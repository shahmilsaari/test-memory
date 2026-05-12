import { Injectable } from '@nestjs/common';
import { AntiPatternRun } from '../entities/anti-pattern-run.entity';
import type { AntiPatternRunRepository } from './anti-pattern-run.repository';

@Injectable()
export class InMemoryAntiPatternRunRepository
  implements AntiPatternRunRepository
{
  private readonly runs = new Map<string, AntiPatternRun>();

  findByEmail(email: string): Promise<AntiPatternRun | null> {
    const normalizedEmail = email.toLowerCase();
    const run =
      Array.from(this.runs.values()).find(
        (storedRun) => storedRun.email === normalizedEmail,
      ) ?? null;

    return Promise.resolve(run);
  }

  save(run: AntiPatternRun): Promise<void> {
    this.runs.set(run.id, run);
    return Promise.resolve();
  }
}
