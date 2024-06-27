import { BaseEntity } from 'common/entities/base.entity';

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
}
