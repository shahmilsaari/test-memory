import { Inject } from '@nestjs/common';
import { USER_REPOSITORY } from '../../repositories/user.repository';
import type { UserRepository } from '../../repositories/user.repository';
import { UserResponseDto } from '../../dtos/users/user-response.dto';

export class ListUsersUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: UserRepository,
  ) {}

  async execute(): Promise<UserResponseDto[]> {
    const users = await this.userRepository.findAll();
    return users.map((u) => ({ id: u.id, email: u.email, name: u.name, createdAt: u.createdAt }));
  }
}
