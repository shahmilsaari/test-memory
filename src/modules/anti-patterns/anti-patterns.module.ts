import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { AntiPatternsController } from './anti-patterns.controller';
import { AntiPatternsService } from './anti-patterns.service';

@Module({
  imports: [UsersModule],
  controllers: [AntiPatternsController],
  providers: [AntiPatternsService],
})
export class AntiPatternsModule {}
