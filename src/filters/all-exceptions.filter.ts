import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    let message: string;
    let errorDetails: any;

    if (exceptionResponse && exceptionResponse['errors']) {
      message = 'Validation failed or input error.';
      errorDetails = exceptionResponse['errors'];
    } else {
      message =
        typeof exceptionResponse === 'string'
          ? exceptionResponse
          : exceptionResponse['message'];
      errorDetails = exception.constructor.name || exceptionResponse;
    }
    response.status(status).json({
      statusCode: status,
      message: message || 'An unexpected error occurred.',
      error: errorDetails,
      timestamp: new Date().toISOString(),
    });
  }
}
