import { AutomobileEntity } from '../entities/automobile.entity';

export type CreateAutomobileBo = Pick<
  AutomobileEntity,
  'brand' | 'color' | 'licensePlate'
>;

export type UpdateAutomobileBo = CreateAutomobileBo;
