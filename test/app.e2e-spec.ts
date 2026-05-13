import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import { configureApp } from './../src/bootstrap';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    configureApp(app);
    await app.init();
  });

  it('/health (GET)', () => {
    return request(app.getHttpServer())
      .get('/api/v1/health')
      .expect(200)
      .expect((response) => {
        const body = response.body as { service: string; status: string };
        expect(body.status).toBe('ok');
        expect(body.service).toBe('test-memory');
        expect(response.headers['x-correlation-id']).toBeDefined();
      });
  });

  afterEach(async () => {
    await app.close();
  });
});
