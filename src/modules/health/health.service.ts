import { Injectable } from '@nestjs/common';
import { HealthResponseDto } from './dto/health-response.dto';

@Injectable()
export class HealthService {
  getStatus(): HealthResponseDto {
    return HealthResponseDto.healthy('test-memory');
  }
}
