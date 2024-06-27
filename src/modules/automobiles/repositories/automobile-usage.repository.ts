import { BaseRepository } from 'common/repositories/base.repository';

import { CreateAutomobileUsageBo } from '../bos/automobile-usage.bo';
import {
  AutomobileUsageRelations,
  AutomobileUsageEntity,
} from '../entities/automobile-usage.entity';

export class AutomobileUsageRepository extends BaseRepository<
  AutomobileUsageEntity,
  CreateAutomobileUsageBo,
  AutomobileUsageRelations
> {}
