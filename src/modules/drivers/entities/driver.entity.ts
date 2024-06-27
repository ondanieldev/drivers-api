import { BaseEntity } from 'common/entities/base.entity';

export class DriverEntity extends BaseEntity {
  constructor({ id, ...data }: DriverEntity) {
    super({ id });
    Object.assign(this, data);
  }

  name: string;
}
