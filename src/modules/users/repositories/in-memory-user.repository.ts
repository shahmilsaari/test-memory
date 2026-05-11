import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import type { UserRepository } from './user.repository';

@Injectable()
export class InMemoryUserRepository implements UserRepository {
  private readonly store = new Map<string, User>();

  findById(id: string): Promise<User | null> {
    return Promise.resolve(this.store.get(id) ?? null);
  }

  findByEmail(email: string): Promise<User | null> {
    const user =
      Array.from(this.store.values()).find(
        (user) => user.email === email.toLowerCase(),
      ) ?? null;

    return Promise.resolve(user);
  }

  save(user: User): Promise<void> {
    this.store.set(user.id, user);
    return Promise.resolve();
  }

  findAll(): Promise<User[]> {
    return Promise.resolve(Array.from(this.store.values()));
  }
}
