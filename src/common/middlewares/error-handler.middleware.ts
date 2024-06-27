import { ValidationError } from 'class-validator';
import { Request, Response, NextFunction } from 'express';

import { StatusCode } from 'common/enums/status-code.enum';
import { AppError } from 'common/errors/app.error';
import { logger } from 'common/utils/logger';

export function errorHandlerMiddleware(
  err: Error,
  _request: Request,
  response: Response,
  _: NextFunction,
): Response {
  // Known errors
  if (err instanceof AppError) {
    return handleAppError(err, response);
  }

  // Validation errors
  if (err instanceof Array && err[0] instanceof ValidationError) {
    return handleValidationError(err as ValidationError[], response);
  }

  // Unexpected errors
  return handleUnexpectedError(err, response);
}

function handleAppError(err: AppError, response: Response): Response {
  return response.status(err.statusCode).json({
    error: err.name,
    message: err.message,
    statusCode: err.statusCode,
  });
}

function handleValidationError(
  err: ValidationError[],
  response: Response,
): Response {
  const message = err
    .map((error) => Object.values(error.constraints || {}).join(', '))
    .join('; ');

  return response.status(StatusCode.BAD_REQUEST).json({
    error: 'Validation Error',
    message,
    statusCode: StatusCode.BAD_REQUEST,
  });
}

function handleUnexpectedError(err: Error, response: Response): Response {
  logger.error(err);

  return response.status(StatusCode.INTERNAL_SERVER_ERROR).json({
    error: 'Internal server error',
    message: 'An unknown error has occurred.',
    statusCode: StatusCode.INTERNAL_SERVER_ERROR,
  });
}
