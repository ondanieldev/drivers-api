import { StatusCode } from 'common/enums/status-code.enum';

export class AppError extends Error {
  public readonly name: string;
  public readonly statusCode: StatusCode;

  constructor(name: string, statusCode: StatusCode, message: string) {
    super(message);

    // Restore prototype chain (see https://stackoverflow.com/a/48342359)
    Object.setPrototypeOf(this, new.target.prototype);

    this.name = name;
    this.statusCode = statusCode;

    Error.captureStackTrace(this);
  }
}
