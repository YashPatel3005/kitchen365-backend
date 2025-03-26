import { BadRequestException, Injectable } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { MESSAGES } from 'src/common/messages.constants';

@Injectable()
export class CustomValidationPipe extends ValidationPipe {
  constructor() {
    super({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      skipMissingProperties: false,
    });
  }

  exceptionFactory = (validationErrors: ValidationError[]) => {
    const formattedErrors = this.formatErrors(validationErrors);
    return new BadRequestException({
      statusCode: 400,
      message: MESSAGES.ERROR.VALIDATION_FAILED,
      errors: formattedErrors,
    });
  };

  private formatErrors(validationErrors: ValidationError[]) {
    return validationErrors.map((err) => ({
      field: err.property,
      errors: err.constraints
        ? Object.values(err.constraints)
        : ['Unknown error'],
    }));
  }
}
