import {
  FindBo,
  FindDataBo,
  FindOptionsBo,
} from 'common/repositories/base.repository';

export class BaseLocalRepositoryUtil<TEntity, TRelations> {
  public doesEntityMatchAnyFindData(
    entity: TEntity,
    find: FindBo<TEntity, TRelations>,
  ): boolean {
    const findDataList = Array.isArray(find.data) ? find.data : [find.data];

    for (const findData of findDataList) {
      if (this.doesEntityMatchFindData(entity, findData, find.options)) {
        return true;
      }
    }

    return false;
  }

  public doesEntityMatchFindData(
    entity: TEntity,
    findData: FindDataBo<TEntity>,
    findOptions?: FindOptionsBo<TEntity>,
  ): boolean {
    const comparisons = [];

    for (const [key, value] of Object.entries(findData)) {
      const isInsentiveKeyMatch = this.isInsentiveKeyMatch(
        entity,
        key as keyof TEntity,
        value,
        findOptions,
      );

      const isKeyMatch = this.isKeyMatch(entity, key as keyof TEntity, value);

      comparisons.push(isInsentiveKeyMatch || isKeyMatch);
    }

    return comparisons.reduce((acc, curr) => acc && curr, true);
  }

  private isKeyMatch<TEntity>(
    entity: TEntity,
    key: keyof TEntity,
    value: TEntity[keyof TEntity],
  ) {
    return entity[key] === value;
  }

  private isInsentiveKeyMatch<TEntity>(
    entity: TEntity,
    key: keyof TEntity,
    value: TEntity[keyof TEntity],
    findOptions?: FindOptionsBo<TEntity>,
  ) {
    if (
      findOptions?.insensitiveKeys?.includes(key) &&
      typeof entity[key] === 'string' &&
      typeof value === 'string'
    ) {
      const entityValue = entity[key] as string;
      return entityValue.toLowerCase() === value.toLowerCase();
    }
  }
}
