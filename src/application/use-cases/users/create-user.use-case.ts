import { Inject } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { User } from '../../../domain/entities/user.entity';
import { USER_REPOSITORY } from '../../repositories/user.repository';
import type { UserRepository } from '../../repositories/user.repository';
import { CreateUserDto } from '../../dtos/users/create-user.dto';
import { UserResponseDto } from '../../dtos/users/user-response.dto';

export class CreateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: UserRepository,
  ) {}

  async execute(dto: CreateUserDto): Promise<UserResponseDto> {
    const existing = await this.userRepository.findByEmail(dto.email);
    if (existing) throw new Error('Email already in use');

    const user = User.create(randomUUID(), dto.email, dto.name);
    await this.userRepository.save(user);

    return { id: user.id, email: user.email, name: user.name, createdAt: user.createdAt };
  }
}
