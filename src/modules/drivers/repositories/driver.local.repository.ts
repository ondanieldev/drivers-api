import { BaseLocalRepository } from 'common/repositories/base-local.repository';

import { CreateDriverBo } from '../bos/driver.bo';
import { DriverEntity } from '../entities/driver.entity';
import { DriverRepository } from './driver.repository';

export class DriverLocalRepository
  extends BaseLocalRepository<DriverEntity, CreateDriverBo>
  implements DriverRepository {}
