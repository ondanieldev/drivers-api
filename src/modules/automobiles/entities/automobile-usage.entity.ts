import { BaseEntity } from 'common/entities/base.entity';

import { DriverEntity } from 'modules/drivers/entities/driver.entity';

import { AutomobileEntity } from './automobile.entity';

export class AutomobileUsageEntity extends BaseEntity {
  constructor({ id, ...data }: AutomobileUsageEntity) {
    super({ id });
    Object.assign(this, data);
  }

  automobileId: string;
  driverId: string;
  finishedAt: Date | null;
  reason: string;
  startedAt: Date;

  automobile?: AutomobileEntity;
  driver?: DriverEntity;
}

export type AutomobileUsageRelations = ('automobile' | 'driver')[];
