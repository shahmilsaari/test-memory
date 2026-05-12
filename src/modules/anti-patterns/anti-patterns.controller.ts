import { Body, Controller, Headers, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { BadInputDto } from './dto/bad-input.dto';
import { AntiPatternsService } from './anti-patterns.service';

@Controller('anti-patterns')
export class AntiPatternsController {
  constructor(private readonly antiPatternsService: AntiPatternsService) {}

  @Post('run')
  async run(
    @Body() dto: BadInputDto,
    @Headers('authorization') authHeader: string | undefined,
    @Res() res: Response,
  ): Promise<void> {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ message: 'missing bearer token' });
      return;
    }

    if (dto.email.endsWith('@gmail.com')) {
      res.status(400).json({ message: 'gmail blocked in controller' });
      return;
    }

    try {
      const result = await this.antiPatternsService.run(dto);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error });
    }
  }
}
