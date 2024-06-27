import { v4 } from 'uuid';

import { StatusCode } from 'common/enums/status-code.enum';
import { AppError } from 'common/errors/app.error';
import { BaseLocalRepositoryUtil } from 'common/utils/base-local-repository.util';

import { BaseEntity } from '../entities/base.entity';
import { BaseRepository, FindBo } from './base.repository';

export class BaseLocalRepository<
  TEntity extends BaseEntity,
  TCreate extends object,
  TRelations extends string[] = [],
> implements BaseRepository<TEntity, TCreate, TRelations>
{
  protected baseLocalRepositoryUtil = new BaseLocalRepositoryUtil<
    TEntity,
    TRelations
  >();

  protected items: TEntity[] = [];

  public async create(data: TCreate): Promise<TEntity> {
    const entity: TEntity = {
      id: v4(),
      ...data,
    } as unknown as TEntity;

    this.items.push(entity);

    return entity;
  }

  public async delete(id: string): Promise<void> {
    this.items = this.items.filter((item) => item.id !== id);
  }

  public async find(
    findBo: FindBo<TEntity, TRelations>,
  ): Promise<TEntity | null> {
    const entity = this.items.find((item) =>
      this.baseLocalRepositoryUtil.doesEntityMatchAnyFindData(item, findBo),
    );

    if (!entity) return null;

    return entity;
  }

  public async findMany(
    findBo: FindBo<TEntity, TRelations>,
  ): Promise<TEntity[]> {
    return this.items.filter((item) =>
      this.baseLocalRepositoryUtil.doesEntityMatchAnyFindData(item, findBo),
    );
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
}
