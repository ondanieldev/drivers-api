export class BaseRepository<TEntity extends object, TCreate extends object> {
  create: (data: TCreate) => Promise<TEntity>;
}
