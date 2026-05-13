import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import type { Response } from 'express';
import type { RequestWithCorrelationId } from '../types/request-with-correlation-id';

@Injectable()
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<RequestWithCorrelationId>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const payload =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Internal server error';

    const message =
      typeof payload === 'string'
        ? payload
        : (payload as { message?: unknown }).message;

    response.status(status).json({
      correlationId: request.correlationId ?? null,
      timestamp: new Date().toISOString(),
      statusCode: status,
      message: message ?? HttpStatus[status],
      path: request.url,
    });
  }
}
