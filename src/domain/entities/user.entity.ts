export class User {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly name: string,
    public readonly createdAt: Date,
  ) {}

  static create(id: string, email: string, name: string): User {
    if (!email.includes('@')) throw new Error('Invalid email');
    if (!name.trim()) throw new Error('Name is required');
    return new User(id, email.toLowerCase(), name.trim(), new Date());
  }
}
