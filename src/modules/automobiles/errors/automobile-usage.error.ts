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
