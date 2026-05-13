import { registerAs } from '@nestjs/config';

const splitCorsOrigins = (value: string): string[] =>
  value
    .split(',')
    .map((origin) => origin.trim())
    .filter((origin) => origin.length > 0);

export default registerAs('app', () => ({
  port: Number(process.env.PORT ?? '3000'),
  corsOrigins: splitCorsOrigins(
    process.env.CORS_ORIGINS ?? 'http://localhost:3000',
  ),
}));
