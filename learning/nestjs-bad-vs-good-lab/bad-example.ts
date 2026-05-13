import {
  BadRequestException,
  Body,
  Controller,
  ForbiddenException,
  Get,
  Param,
  Post,
  Req,
} from '@nestjs/common';

type UserEntity = {
  id: number;
  email: string;
  passwordHash: string;
  isVip: boolean;
};

class FakeOrmClient {
  private users: UserEntity[] = [];

  save(user: Omit<UserEntity, 'id'>): UserEntity {
    const created = { ...user, id: this.users.length + 1 };
    this.users.push(created);
    return created;
  }

  findById(id: number): UserEntity | undefined {
    return this.users.find((u) => u.id === id);
  }
}

const fakeOrm = new FakeOrmClient();

@Controller('users')
export class BadUsersController {
  @Post()
  create(@Body() body: any, @Req() req: any) {
    if (req.headers.authorization !== `Bearer ${process.env.ADMIN_TOKEN}`) {
      throw new ForbiddenException('No access');
    }

    if (!body.email?.includes('@')) {
      throw new BadRequestException('Invalid email');
    }

    const totalSpent = (body.orders ?? []).reduce(
      (sum: number, order: { total: number }) => sum + order.total,
      0,
    );

    const created = fakeOrm.save({
      email: body.email,
      passwordHash: body.password,
      isVip: totalSpent >= 1000,
    });

    return created;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const entity = fakeOrm.findById(Number(id));
    if (!entity) {
      throw new Error('User not found');
    }

    return entity;
  }
}
