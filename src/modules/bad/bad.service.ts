import { BadRequestException, Injectable } from '@nestjs/common';
import { BadEntity } from './bad.entity';

@Injectable()
export class BadService {
  private readonly records: BadEntity[] = [];

  create(name: string): BadEntity {
    if (!name.trim()) {
      throw new BadRequestException('Name cannot be empty');
    }

    const record = BadEntity.create(name);
    this.records.push(record);
    return record;
  }

  list(): BadEntity[] {
    return [...this.records];
  }

  failValidation(): never {
    throw new BadRequestException('Request is invalid');
  }
}
