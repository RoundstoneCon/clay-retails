import { Injectable } from '@nestjs/common';

@Injectable()
export class ApiResponseService {
  success(message: string, data: any = {}, meta: any = {}) {
    return {
      status: 'success',
      message,
      data,
      errors: {},
      meta,
    };
  }

  failure(message: string, errors: any = {}, meta: any = {}) {
    return {
      status: 'failure',
      message,
      data: {},
      errors,
      meta,
    };
  }

  pending(message: string, meta: any = {}) {
    return {
      status: 'pending',
      message,
      data: {},
      errors: {},
      meta,
    };
  }

  validationError(message: string, errors: any = {}, meta: any = {}) {
    return {
      status: 'validation_error',
      message,
      data: {},
      errors,
      meta,
    };
  }
}
