import { inject, injectable } from 'tsyringe';

import { CreateAutomobileBo, UpdateAutomobileBo } from '../bos/automobile.bo';
import { AutomobileEntity } from '../entities/automobile.entity';
import { AutomobileNotFoundError } from '../errors/automobile.error';
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

  public async readById(id: string): Promise<AutomobileEntity> {
    const automobile = await this.automobileRepository.find({
      data: { id },
    });

    if (!automobile) {
      throw new AutomobileNotFoundError(id);
    }

    return automobile;
  }

  public async readList(
    data: Partial<AutomobileEntity>,
  ): Promise<AutomobileEntity[]> {
    return this.automobileRepository.findMany({
      data,
      options: {
        includeSearchKeys: ['brand', 'color'],
      },
    });
  }

  public async update({
    data,
    id,
  }: {
    data: UpdateAutomobileBo;
    id: string;
  }): Promise<AutomobileEntity> {
    const automobile = await this.readById(id);

    Object.assign(automobile, data);

    return this.automobileRepository.save(automobile);
  }

  public async delete(id: string): Promise<void> {
    const automobile = await this.readById(id);

    await this.automobileRepository.delete(automobile.id);
  }
}
