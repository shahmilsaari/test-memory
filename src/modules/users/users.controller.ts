import { Body, Controller, Get, Post } from '@nestjs/common';
import { UuidParam } from '../../common/decorators/uuid-param.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() dto: CreateUserDto): Promise<UserResponseDto> {
    return this.usersService.create(dto);
  }

  @Get()
  list(): Promise<UserResponseDto[]> {
    return this.usersService.list();
  }

  @Get(':id')
  findOne(@UuidParam('id') id: string): Promise<UserResponseDto> {
    return this.usersService.findOne(id);
  }
}
