import { inject, injectable } from 'tsyringe';

import { DriverService } from 'modules/drivers/services/driver.service';

import { StartAutomobileUsageBo } from '../bos/automobile-usage.bo';
import { AutomobileUsageEntity } from '../entities/automobile-usage.entity';
import {
  AutomobileUsageAlreadyFinishedConflictError,
  AutomobileUsageNotFoundError,
  DriverAlreadyUsingAnAutomobileConflictError,
} from '../errors/automobile-usage.error';
import { AutomobileUsageRepository } from '../repositories/automobile-usage.repository';
import { AutomobileService } from './automobile.service';

@injectable()
export class AutomobileUsageService {
  constructor(
    @inject('AutomobileService')
    private readonly automobileService: AutomobileService,

    @inject('DriverService')
    private readonly driverService: DriverService,

    @inject('AutomobileUsageRepository')
    private readonly automobileUsageRepository: AutomobileUsageRepository,
  ) {}

  public async start(
    data: StartAutomobileUsageBo,
  ): Promise<AutomobileUsageEntity> {
    // Ensure both driver and automobile exists
    await this.driverService.readById(data.driverId);
    await this.automobileService.readById(data.automobileId);

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

  public async finish(id: string): Promise<AutomobileUsageEntity> {
    const usage = await this.automobileUsageRepository.find({
      data: {
        id,
      },
    });

    if (!usage) {
      throw new AutomobileUsageNotFoundError(id);
    }

    if (usage.finishedAt) {
      throw new AutomobileUsageAlreadyFinishedConflictError({
        finishedAt: usage.finishedAt,
        id,
      });
    }

    usage.finishedAt = new Date();

    return this.automobileUsageRepository.save(usage);
  }

  public async readList(): Promise<AutomobileUsageEntity[]> {
    return this.automobileUsageRepository.findMany({
      data: {},
      relations: ['automobile', 'driver'],
    });
  }
}
