import { inject, injectable } from 'tsyringe';

import { CreateAutomobileBo } from '../bos/automobile.bo';
import { AutomobileEntity } from '../entities/automobile.entity';
import { AutomobileRepository } from '../repositories/automobile.repository';

@injectable()
export class AutomobileService {
  constructor(
    @inject('AutomobileRepository')
    private readonly automobileRepository: AutomobileRepository,
  ) {}

  public async create(data: CreateAutomobileBo): Promise<AutomobileEntity> {
    return this.automobileRepository.create(data);
  }
}
