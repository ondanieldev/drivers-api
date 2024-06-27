import { FindBo, FindOptionsBo } from 'common/repositories/base.repository';

/**
 * Utility class for local repositories.
 */
export class BaseLocalRepositoryUtil<TEntity, TRelations> {
  /**
   * Check if the entity matches any of the find data.
   * Find data is an object or an array of objects, if entity matches any of the objects, it returns true.
   * This is basically an OR operation between the find data objects.
   */
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

  /**
   * Check if the entity matches a single object of find data. Which means all the keys and values of the object should match the entity.
   * This is basically an AND operation between the keys and values of the find data object.
   */
  public doesEntityMatchFindData(
    entity: TEntity,
    findData: Partial<TEntity>,
    findOptions?: FindOptionsBo<TEntity>,
  ): boolean {
    const comparisons = [];

    for (const [key, value] of Object.entries(findData)) {
      const isKeyMatch = this.isKeyMatch(
        entity,
        key as keyof TEntity,
        value as TEntity[keyof TEntity],
      );

      const isInsentiveKeyMatch = this.isInsentiveKeyMatch(
        entity,
        key as keyof TEntity,
        value as TEntity[keyof TEntity],
        findOptions,
      );

      const isIncludeKeyMatch = this.isIncludeKeyMatch(
        entity,
        key as keyof TEntity,
        value as TEntity[keyof TEntity],
        findOptions,
      );

      comparisons.push(isKeyMatch || isInsentiveKeyMatch || isIncludeKeyMatch);
    }

    return comparisons.reduce((acc, curr) => acc && curr, true);
  }

  /**
   * Check if the key of the entity matches the value exactly.
   */
  private isKeyMatch<TEntity>(
    entity: TEntity,
    key: keyof TEntity,
    value: TEntity[keyof TEntity],
  ) {
    return entity[key] === value;
  }

  /**
   * Check if the key of the entity matches the value case insensitively.
   */
  private isInsentiveKeyMatch<TEntity>(
    entity: TEntity,
    key: keyof TEntity,
    value: TEntity[keyof TEntity],
    findOptions?: FindOptionsBo<TEntity>,
  ) {
    if (
      findOptions?.insensitiveSearchKeys?.includes(key) &&
      typeof entity[key] === 'string' &&
      typeof value === 'string'
    ) {
      const entityValue = entity[key] as string;
      return entityValue.toLowerCase() === value.toLowerCase();
    }
    return false;
  }

  /**
   * Check if the key of the entity includes the value.
   */
  private isIncludeKeyMatch<TEntity>(
    entity: TEntity,
    key: keyof TEntity,
    value: TEntity[keyof TEntity],
    findOptions?: FindOptionsBo<TEntity>,
  ) {
    if (
      findOptions?.includeSearchKeys?.includes(key) &&
      typeof entity[key] === 'string' &&
      typeof value === 'string'
    ) {
      const entityValue = entity[key] as string;
      return entityValue.toLowerCase().includes(value.toLowerCase());
    }
    return false;
  }
}
