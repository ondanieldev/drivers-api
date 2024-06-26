import { Request, Response, NextFunction } from 'express';

import { ErrorStatusCode } from 'common/enums/error-status-code.enum';
import { AppError } from 'common/errors/app.error';
import { logger } from 'common/utils/logger';

export function errorHandlerMiddleware(
  err: Error,
  _request: Request,
  response: Response,
  _: NextFunction,
): Response {
  // If it is a known error, return the error message and status code
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      error: err.name,
      message: err.message,
      statusCode: err.statusCode,
    });
  }

  // Otherwise, log the error and return a generic error message
  logger.error(err);
  return response.status(ErrorStatusCode.INTERNAL_SERVER_ERROR).json({
    error: 'Internal server error',
    message: 'An unknown error has occurred.',
    statusCode: ErrorStatusCode.INTERNAL_SERVER_ERROR,
  });
}
