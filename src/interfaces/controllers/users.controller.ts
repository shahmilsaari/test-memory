import { Body, Controller, Get, NotFoundException, Param, Post, BadRequestException } from '@nestjs/common';
import { CreateUserUseCase } from '../../application/use-cases/users/create-user.use-case';
import { GetUserUseCase } from '../../application/use-cases/users/get-user.use-case';
import { ListUsersUseCase } from '../../application/use-cases/users/list-users.use-case';
import { CreateUserDto } from '../../application/dtos/users/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly createUser: CreateUserUseCase,
    private readonly getUser: GetUserUseCase,
    private readonly listUsers: ListUsersUseCase,
  ) {}

  @Post()
  async create(@Body() dto: CreateUserDto) {
    try {
      return await this.createUser.execute(dto);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Get()
  async list() {
    return this.listUsers.execute();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.getUser.execute(id);
    } catch {
      throw new NotFoundException('User not found');
    }
  }
}
