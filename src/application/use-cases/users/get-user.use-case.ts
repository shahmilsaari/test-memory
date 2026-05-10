import { Inject } from '@nestjs/common';
import { USER_REPOSITORY } from '../../repositories/user.repository';
import type { UserRepository } from '../../repositories/user.repository';
import { UserResponseDto } from '../../dtos/users/user-response.dto';

export class GetUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: UserRepository,
  ) {}

  async execute(id: string): Promise<UserResponseDto> {
    const user = await this.userRepository.findById(id);
    if (!user) throw new Error('User not found');

    return { id: user.id, email: user.email, name: user.name, createdAt: user.createdAt };
  }
}
