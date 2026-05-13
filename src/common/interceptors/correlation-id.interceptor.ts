import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Observable } from 'rxjs';
import type { Response } from 'express';
import type { RequestWithCorrelationId } from '../types/request-with-correlation-id';

const CORRELATION_ID_HEADER = 'x-correlation-id';

@Injectable()
export class CorrelationIdInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    if (context.getType() !== 'http') return next.handle();

    const request = context
      .switchToHttp()
      .getRequest<RequestWithCorrelationId>();
    const response = context.switchToHttp().getResponse<Response>();

    const incoming = request.headers[CORRELATION_ID_HEADER];
    const correlationId =
      this.extractHeaderValue(incoming) ?? this.generateCorrelationId();

    request.correlationId = correlationId;
    response.setHeader(CORRELATION_ID_HEADER, correlationId);

    return next.handle();
  }

  private extractHeaderValue(
    value: string | string[] | undefined,
  ): string | null {
    if (!value) return null;

    const raw = Array.isArray(value) ? value[0] : value;
    const trimmed = raw.trim();
    return trimmed.length > 0 ? trimmed : null;
  }

  private generateCorrelationId(): string {
    return randomUUID();
  }
}
