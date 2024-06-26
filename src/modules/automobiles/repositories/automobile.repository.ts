import { CreateAutomobileBo } from '../bos/automobile.bo';
import { AutomobileEntity } from '../entities/automobile.entity';

export class AutomobileRepository {
  create: (data: CreateAutomobileBo) => Promise<AutomobileEntity>;
}
