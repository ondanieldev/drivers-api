import { v4 } from 'uuid';

import { CreateAutomobileBo } from '../bos/automobile.bo';
import { AutomobileEntity } from '../entities/automobile.entity';
import { AutomobileRepository } from './automobile.repository';

export class AutomobileLocalRepository implements AutomobileRepository {
  private automobiles: AutomobileEntity[] = [];

  public async create(data: CreateAutomobileBo): Promise<AutomobileEntity> {
    const automobile = new AutomobileEntity({
      id: v4(),
      ...data,
    });

    this.automobiles.push(automobile);

    return automobile;
  }
}
