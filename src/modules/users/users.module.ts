import { Module } from '@nestjs/common';
import { USER_REPOSITORY } from './repositories/user.repository';
import { InMemoryUserRepository } from './repositories/in-memory-user.repository';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    { provide: USER_REPOSITORY, useClass: InMemoryUserRepository },
  ],
})
export class UsersModule {}
