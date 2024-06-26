import { v4 } from 'uuid';

import { BaseEntity } from 'common/entities/base.entity';

import { BaseRepository } from './base.repository';

export class BaseLocalRepository<
  TEntity extends BaseEntity,
  TCreate extends object,
> implements BaseRepository<TEntity, TCreate>
{
  protected items: TEntity[] = [];

  public async create(data: TCreate): Promise<TEntity> {
    const entity: TEntity = {
      id: v4(),
      ...data,
    } as unknown as TEntity;

    this.items.push(entity);

    return entity;
  }
}
