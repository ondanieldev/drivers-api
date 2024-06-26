import { BaseRepository } from 'common/repositories/base.repository';

import { CreateAutomobileBo } from '../bos/automobile.bo';
import { AutomobileEntity } from '../entities/automobile.entity';

export class AutomobileRepository extends BaseRepository<
  AutomobileEntity,
  CreateAutomobileBo
> {}
