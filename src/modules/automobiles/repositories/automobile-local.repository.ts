import { BaseLocalRepository } from 'common/repositories/base-local.repository';

import { CreateAutomobileBo } from '../bos/automobile.bo';
import { AutomobileEntity } from '../entities/automobile.entity';
import { AutomobileRepository } from './automobile.repository';

export class AutomobileLocalRepository
  extends BaseLocalRepository<AutomobileEntity, CreateAutomobileBo>
  implements AutomobileRepository {}
