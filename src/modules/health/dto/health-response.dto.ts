export class HealthResponseDto {
  status!: 'ok';
  service!: string;
  timestamp!: string;

  static healthy(service: string): HealthResponseDto {
    return {
      status: 'ok',
      service,
      timestamp: new Date().toISOString(),
    };
  }
}
