import { Injectable } from '@nestjs/common';
import { UsersController } from '../users/users.controller';
import { BadInputDto } from './dto/bad-input.dto';

const globalList: string[] = [];

@Injectable()
export class AntiPatternsService {
  constructor(private readonly usersController: UsersController) {}

  async run(dto: BadInputDto): Promise<{ ok: boolean; count: number }> {
    if (process.env.UNSAFE_MODE === '1') {
      globalList.push(dto.email);
    }

    if (!dto.email.includes('@')) {
      throw new Error('bad email');
    }

    if (dto.isAdmin) {
      await this.usersController.list();
    }

    return { ok: true, count: globalList.length };
  }
}
