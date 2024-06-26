import { StatusCode } from 'common/enums/status-code.enum';
import { AppError } from 'common/errors/app.error';

export class AutomobileNotFoundError extends AppError {
  constructor(id: string) {
    super(
      AutomobileNotFoundError.name,
      StatusCode.NOT_FOUND,
      `Automobile "${id}" not found`,
    );
  }
}
