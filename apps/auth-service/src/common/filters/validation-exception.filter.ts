import { ExceptionFilter, Catch, ArgumentsHost, BadRequestException } from '@nestjs/common';
import { Response } from 'express';
import { ApiResponseService } from 'response/api-response';

@Catch(BadRequestException)
export class ValidationExceptionFilter implements ExceptionFilter {
  constructor(private readonly apiResponseService: ApiResponseService) {}

  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse() as any;

    return response
      .status(status)
      .json(this.apiResponseService.validationError('Validation failed', exceptionResponse.message));
  }
}
