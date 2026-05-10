import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

@Catch(Error)
export class DomainExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status =
      exception.message === 'User not found' || exception.message === 'Company not found'
        ? HttpStatus.NOT_FOUND
        : HttpStatus.BAD_REQUEST;

    response.status(status).json({ statusCode: status, message: exception.message });
  }
}
