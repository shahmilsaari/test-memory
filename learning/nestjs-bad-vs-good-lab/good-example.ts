import {
  Body,
  Controller,
  Get,
  Injectable,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { IsEmail, IsString, MinLength } from 'class-validator';
import { randomUUID } from 'crypto';

type User = {
  id: string;
  email: string;
  passwordHash: string;
  isVip: boolean;
};

export class CreateUserDto {
  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(8)
  password!: string;
}

export class UserResponseDto {
  id!: string;
  email!: string;
  isVip!: boolean;
}

export interface UserRepository {
  create(input: Omit<User, 'id'>): Promise<User>;
  findById(id: string): Promise<User | null>;
}

@Injectable()
export class InMemoryUserRepository implements UserRepository {
  private users: User[] = [];

  async create(input: Omit<User, 'id'>): Promise<User> {
    const user: User = { ...input, id: randomUUID() };
    this.users.push(user);
    return user;
  }

  async findById(id: string): Promise<User | null> {
    return this.users.find((u) => u.id === id) ?? null;
  }
}

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UserRepository) {}

  async create(dto: CreateUserDto): Promise<UserResponseDto> {
    const created = await this.usersRepository.create({
      email: dto.email,
      passwordHash: this.hashPassword(dto.password),
      isVip: false,
    });

    return this.toResponse(created);
  }

  async findOne(id: string): Promise<UserResponseDto> {
    const user = await this.usersRepository.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.toResponse(user);
  }

  private toResponse(user: User): UserResponseDto {
    return {
      id: user.id,
      email: user.email,
      isVip: user.isVip,
    };
  }

  private hashPassword(password: string): string {
    return `hashed:${password}`;
  }
}

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() dto: CreateUserDto): Promise<UserResponseDto> {
    return this.usersService.create(dto);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<UserResponseDto> {
    return this.usersService.findOne(id);
  }
}
