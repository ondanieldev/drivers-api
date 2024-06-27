import { AutomobileUsageEntity } from '../entities/automobile-usage.entity';

export type CreateAutomobileUsageBo = Pick<
  AutomobileUsageEntity,
  'automobileId' | 'driverId' | 'finishedAt' | 'reason' | 'startedAt'
>;
