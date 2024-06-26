export class BaseRepository<
  TEntity extends object,
  TCreate extends object,
  TRelations extends string[] = [],
> {
  create: (data: TCreate) => Promise<TEntity>;

  find: ({}: FindBo<TEntity, TRelations>) => Promise<TEntity | null>;

  save: (entity: TEntity) => Promise<TEntity>;
}

export type FindDataBo<TEntity> = Partial<TEntity> | Partial<TEntity>[];

export type FindOptionsBo<TEntity> = {
  insensitiveKeys?: (keyof TEntity)[];
};

export type FindBo<TEntity, TRelations = []> = {
  data: FindDataBo<TEntity>;
  options?: FindOptionsBo<TEntity>;
  relations?: TRelations[];
};
