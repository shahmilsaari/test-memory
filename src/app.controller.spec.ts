import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from './modules/health/health.controller';
import { HealthService } from './modules/health/health.service';

describe('HealthController', () => {
  let healthController: HealthController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [HealthService],
    }).compile();

    healthController = app.get<HealthController>(HealthController);
  });

  describe('getStatus', () => {
    it('returns health response DTO', () => {
      const response = healthController.getStatus();
      expect(response.status).toBe('ok');
      expect(response.service).toBe('test-memory');
      expect(response.timestamp).toMatch(/^\d{4}-\d{2}-\d{2}T/);
    });
  });
});
