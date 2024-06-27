import { inject, injectable } from 'tsyringe';

import { BaseLocalRepository } from 'common/repositories/base-local.repository';
import { FindBo } from 'common/repositories/base.repository';

import { DriverRepository } from 'modules/drivers/repositories/driver.repository';

import { CreateAutomobileUsageBo } from '../bos/automobile-usage.bo';
import {
  AutomobileUsageRelations,
  AutomobileUsageEntity,
} from '../entities/automobile-usage.entity';
import { AutomobileUsageRepository } from './automobile-usage.repository';
import { AutomobileRepository } from './automobile.repository';

@injectable()
export class AutomobileUsageLocalRepository
  extends BaseLocalRepository<
    AutomobileUsageEntity,
    CreateAutomobileUsageBo,
    AutomobileUsageRelations
  >
  implements AutomobileUsageRepository
{
  constructor(
    @inject('AutomobileRepository')
    private readonly automobileRepository: AutomobileRepository,

    @inject('DriverRepository')
    private readonly driverRepository: DriverRepository,
  ) {
    super();
  }

  async getEntityWithRelations({
    entity,
    relations = [],
  }: {
    entity: AutomobileUsageEntity;
    relations?: AutomobileUsageRelations;
  }): Promise<AutomobileUsageEntity> {
    const entityWithRelations = { ...entity };

    for (const relation of relations) {
      if (relation === 'automobile') {
        const automobile = await this.automobileRepository.find({
          data: {
            id: entityWithRelations.automobileId,
          },
        });
        entityWithRelations.automobile = automobile || undefined;
      } else if (relation === 'driver') {
        const driver = await this.driverRepository.find({
          data: {
            id: entityWithRelations.driverId,
          },
        });
        entityWithRelations.driver = driver || undefined;
      }
    }

    return entityWithRelations;
  }

  public async findMany(
    findBo: FindBo<AutomobileUsageEntity, AutomobileUsageRelations>,
  ): Promise<AutomobileUsageEntity[]> {
    const result: AutomobileUsageEntity[] = [];

    for (const item of this.items) {
      const isMatch = this.baseLocalRepositoryUtil.doesEntityMatchAnyFindData(
        item,
        findBo,
      );

      if (!isMatch) {
        continue;
      }

      const entityWithRelations = await this.getEntityWithRelations({
        entity: item,
        relations: findBo.relations,
      });

      result.push(entityWithRelations);
    }

    return result;
  }
}
