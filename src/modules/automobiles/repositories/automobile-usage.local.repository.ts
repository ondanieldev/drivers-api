import { BaseLocalRepository } from 'common/repositories/base-local.repository';

import { CreateAutomobileUsageBo } from '../bos/automobile-usage.bo';
import { AutomobileUsageEntity } from '../entities/automobile-usage.entity';
import { AutomobileUsageRepository } from './automobile-usage.repository';

export class AutomobileUsageLocalRepository
  extends BaseLocalRepository<AutomobileUsageEntity, CreateAutomobileUsageBo>
  implements AutomobileUsageRepository {}
