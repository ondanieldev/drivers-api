export class BaseRepository<
  TEntity extends object,
  TCreate extends object,
  TRelations extends string[] = [],
> {
  create: (data: TCreate) => Promise<TEntity>;

  delete: (id: string) => Promise<void>;

  find: ({}: FindBo<TEntity, TRelations>) => Promise<TEntity | null>;

  findMany: ({}: FindBo<TEntity, TRelations>) => Promise<TEntity[]>;

  save: (entity: TEntity) => Promise<TEntity>;
}

export type FindDataBo<TEntity> = Partial<TEntity> | Partial<TEntity>[];

/**
 * @param insensitiveSearchKeys - Keys that should be searched in a case-insensitive way.
 * @param includeSearchKeys - Keys that should be searched by including the search term.
 */
export type FindOptionsBo<TEntity> = {
  insensitiveSearchKeys?: (keyof TEntity)[];
  includeSearchKeys?: (keyof TEntity)[];
};

export type FindBo<TEntity, TRelations = []> = {
  data: FindDataBo<TEntity>;
  options?: FindOptionsBo<TEntity>;
  relations?: TRelations;
};
