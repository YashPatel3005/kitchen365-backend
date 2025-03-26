import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
  ConflictException,
  Logger,
} from '@nestjs/common';
export class Utils {
  private static readonly logger = new Logger(Utils.name);

  static handleDatabaseError(error: {
    name: string;
    code: string;
    message: string;
  }): void {
    Utils.logger.error(error);

    if (error instanceof NotFoundException) {
      throw error;
    }

    if (error instanceof ConflictException) {
      throw error;
    }

    if (error instanceof BadRequestException) {
      throw error;
    }

    if (error instanceof Error) {
      throw error;
    }

    if (error.name === 'QueryFailedError') {
      throw new InternalServerErrorException('Database query failed');
    }

    if (
      error.code === 'ECONNREFUSED' ||
      error.message.includes('ECONNREFUSED')
    ) {
      throw new InternalServerErrorException('Database connection error');
    }

    throw new InternalServerErrorException(
      `An internal error occurred: ${error.message || 'Unknown error'}`,
    );
  }
}
