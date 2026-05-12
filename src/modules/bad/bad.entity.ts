import { randomUUID } from 'crypto';

export class BadEntity {
  private constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly createdAt: Date,
    public readonly deletedAt: Date | null,
  ) {}

  static create(name: string): BadEntity {
    return new BadEntity(randomUUID(), name.trim(), new Date(), null);
  }
}
