import { v4 } from 'uuid';

import { StatusCode } from 'common/enums/status-code.enum';
import { AppError } from 'common/errors/app.error';

import { BaseEntity } from '../entities/base.entity';
import { BaseRepository, FindBo } from './base.repository';

export class BaseLocalRepository<
  TEntity extends BaseEntity,
  TCreate extends object,
  TRelations extends string[] = [],
> implements BaseRepository<TEntity, TCreate, TRelations>
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

  public async find({
    data,
  }: FindBo<TEntity, TRelations>): Promise<TEntity | null> {
    const entity = this.items.find((item) => this.isMatch(item, data));

    if (!entity) return null;

    return entity;
  }

  public async save(entity: TEntity): Promise<TEntity> {
    const currentEntity = this.items.find((item) => item.id === entity.id);

    if (!currentEntity) {
      throw new AppError(
        'Save entity error',
        StatusCode.NOT_FOUND,
        'Cannot find entity to be saved',
      );
    }

    Object.assign(currentEntity, entity);

    return currentEntity;
  }

  private isMatch(
    entity: TEntity,
    findData: Partial<TEntity> | Partial<TEntity>[],
  ): boolean {
    let match: boolean = true;

    const findDataArray = Array.isArray(findData) ? findData : [findData];

    for (const findData of findDataArray) {
      match = true;
      for (const [key, value] of Object.entries(findData)) {
        if (entity[key as keyof TEntity] !== value) {
          match = false;
        }
      }
      if (match) {
        break;
      }
    }

    return match;
  }
}
