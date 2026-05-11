export class Company {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly email: string,
    public readonly createdAt: Date,
  ) {}

  static create(id: string, name: string, email: string): Company {
    return new Company(id, name, email, new Date());
  }
}
