import { BaseRepository } from 'common/repositories/base.repository';

import { CreateDriverBo } from '../bos/driver.bo';
import { DriverEntity } from '../entities/driver.entity';

export class DriverRepository extends BaseRepository<
  DriverEntity,
  CreateDriverBo
> {}
