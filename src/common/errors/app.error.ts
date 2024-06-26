import { ErrorStatusCode } from 'common/enums/error-status-code.enum';

export class AppError extends Error {
  public readonly name: string;
  public readonly statusCode: ErrorStatusCode;
  public readonly isOperational: boolean;

  constructor(
    name: string,
    statusCode: ErrorStatusCode,
    message: string,
    isOperational: boolean,
  ) {
    super(message);

    Object.setPrototypeOf(this, new.target.prototype);

    this.name = name;
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    Error.captureStackTrace(this);
  }
}
