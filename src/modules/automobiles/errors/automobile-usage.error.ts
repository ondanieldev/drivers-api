import { StatusCode } from 'common/enums/status-code.enum';
import { AppError } from 'common/errors/app.error';

export class DriverAlreadyUsingAnAutomobileConflictError extends AppError {
  constructor({
    automobileId,
    automobileUsageId,
    driverId,
  }: {
    automobileId: string;
    automobileUsageId: string;
    driverId: string;
  }) {
    super(
      DriverAlreadyUsingAnAutomobileConflictError.name,
      StatusCode.CONFLICT,
      `The driver "${driverId}" is already using the automobile "${automobileId}". Its usage's id is ${automobileUsageId}. Plese finish it before starting a new one.`,
    );
  }
}

export class AutomobileUsageNotFoundError extends AppError {
  constructor(id: string) {
    super(
      AutomobileUsageNotFoundError.name,
      StatusCode.NOT_FOUND,
      `The automobile usage "${id}" was not found.`,
    );
  }
}

export class AutomobileUsageAlreadyFinishedConflictError extends AppError {
  constructor({ finishedAt, id }: { id: string; finishedAt: Date }) {
    super(
      AutomobileUsageNotFoundError.name,
      StatusCode.CONFLICT,
      `The automobile usage "${id}" was already finished at ${finishedAt.toISOString()}.`,
    );
  }
}
