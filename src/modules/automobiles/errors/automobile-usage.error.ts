import { StatusCode } from 'common/enums/status-code.enum';
import { AppError } from 'common/errors/app.error';

export class AutomobileUnfinishedUsageConflictError extends AppError {
  constructor({
    automobileId,
    automobileUsageId,
  }: {
    automobileId: string;
    automobileUsageId: string;
  }) {
    super(
      AutomobileUnfinishedUsageConflictError.name,
      StatusCode.CONFLICT,
      `The automobile "${automobileId}" is already being used. Its usage's id is "${automobileUsageId}". Please finish it before starting a new one.`,
    );
  }
}

export class DriverUnfinishedUsageConflictError extends AppError {
  constructor({
    automobileUsageId,
    driverId,
  }: {
    automobileUsageId: string;
    driverId: string;
  }) {
    super(
      DriverUnfinishedUsageConflictError.name,
      StatusCode.CONFLICT,
      `The driver "${driverId}" is already using an automobile. Its usage's id is "${automobileUsageId}". Please finish it before starting a new one.`,
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
