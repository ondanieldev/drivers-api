import { inject, injectable } from 'tsyringe';

import { StartAutomobileUsageBo } from '../bos/automobile-usage.bo';
import { AutomobileUsageEntity } from '../entities/automobile-usage.entity';
import { DriverAlreadyUsingAnAutomobileConflictError } from '../errors/automobile-usage.error';
import { AutomobileUsageRepository } from '../repositories/automobile-usage.repository';

@injectable()
export class AutomobileUsageService {
  constructor(
    @inject('AutomobileUsageRepository')
    private readonly automobileUsageRepository: AutomobileUsageRepository,
  ) {}

  public async start(
    data: StartAutomobileUsageBo,
  ): Promise<AutomobileUsageEntity> {
    const driverUnfinishedUsage = await this.automobileUsageRepository.find({
      data: {
        driverId: data.driverId,
        finishedAt: null,
      },
    });

    if (driverUnfinishedUsage) {
      throw new DriverAlreadyUsingAnAutomobileConflictError({
        automobileId: driverUnfinishedUsage.automobileId,
        automobileUsageId: driverUnfinishedUsage.id,
        driverId: data.driverId,
      });
    }

    return this.automobileUsageRepository.create({
      ...data,
      startedAt: new Date(),
      finishedAt: null,
    });
  }
}
