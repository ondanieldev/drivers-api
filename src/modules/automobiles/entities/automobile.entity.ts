import { BaseEntity } from 'common/entities/base.entity';

export class AutomobileEntity extends BaseEntity {
  constructor({ id, ...data }: AutomobileEntity) {
    super({ id });
    Object.assign(this, data);
  }

  brand: string;
  color: string;
  licensePlate: string;
}
