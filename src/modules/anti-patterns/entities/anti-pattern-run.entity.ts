export class AntiPatternRun {
  private constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly isAdmin: boolean,
    public readonly createdAt: Date,
  ) {}

  static create(params: {
    id: string;
    email: string;
    isAdmin: boolean;
  }): AntiPatternRun {
    return new AntiPatternRun(
      params.id,
      params.email.toLowerCase(),
      params.isAdmin,
      new Date(),
    );
  }
}
