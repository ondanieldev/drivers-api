import { inject, injectable } from 'tsyringe';

import { CreateDriverBo, UpdateDriverBo } from '../bos/driver.bo';
import { DriverEntity } from '../entities/driver.entity';
import { DriverNotFoundError } from '../errors/driver.error';
import { DriverRepository } from '../repositories/driver.repository';

@injectable()
export class DriverService {
  constructor(
    @inject('DriverRepository')
    private readonly driverRepository: DriverRepository,
  ) {}

  public async create(data: CreateDriverBo): Promise<DriverEntity> {
    return this.driverRepository.create(data);
  }

  public async readById(id: string): Promise<DriverEntity> {
    const driver = await this.driverRepository.find({
      data: { id },
    });

    if (!driver) {
      throw new DriverNotFoundError(id);
    }

    return driver;
  }

  public async readList(data: Partial<DriverEntity>): Promise<DriverEntity[]> {
    return this.driverRepository.findMany({
      data,
      options: {
        insensitiveKeys: ['name'],
      },
    });
  }

  public async update({
    data,
    id,
  }: {
    data: UpdateDriverBo;
    id: string;
  }): Promise<DriverEntity> {
    const driver = await this.driverRepository.find({ data: { id } });

    if (!driver) {
      throw new DriverNotFoundError(id);
    }

    Object.assign(driver, data);

    return this.driverRepository.save(driver);
  }

  public async delete(id: string): Promise<void> {
    const driver = await this.driverRepository.find({ data: { id } });

    if (!driver) {
      throw new DriverNotFoundError(id);
    }

    await this.driverRepository.delete(driver.id);
  }
}
