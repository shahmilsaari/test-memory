import { Module } from '@nestjs/common';
import { USER_REPOSITORY } from './application/repositories/user.repository';
import { InMemoryUserRepository } from './infrastructure/database/repositories/in-memory-user.repository';
import { CreateUserUseCase } from './application/use-cases/users/create-user.use-case';
import { GetUserUseCase } from './application/use-cases/users/get-user.use-case';
import { ListUsersUseCase } from './application/use-cases/users/list-users.use-case';
import { UsersController } from './interfaces/controllers/users.controller';

@Module({
  controllers: [UsersController],
  providers: [
    { provide: USER_REPOSITORY, useClass: InMemoryUserRepository },
    CreateUserUseCase,
    GetUserUseCase,
    ListUsersUseCase,
  ],
})
export class UsersModule {}
