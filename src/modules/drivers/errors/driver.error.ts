import { StatusCode } from 'common/enums/status-code.enum';
import { AppError } from 'common/errors/app.error';

export class DriverNotFoundError extends AppError {
  constructor(id: string) {
    super(
      DriverNotFoundError.name,
      StatusCode.NOT_FOUND,
      `Driver "${id}" not found`,
    );
  }
}
