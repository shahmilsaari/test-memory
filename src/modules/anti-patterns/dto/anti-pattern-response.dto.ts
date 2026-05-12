import { AntiPatternRun } from '../entities/anti-pattern-run.entity';

export class AntiPatternResponseDto {
  id: string;
  email: string;
  admin: boolean;
  createdAt: string;

  static fromEntity(run: AntiPatternRun): AntiPatternResponseDto {
    return {
      id: run.id,
      email: run.email,
      admin: run.isAdmin,
      createdAt: run.createdAt.toISOString(),
    };
  }
}
