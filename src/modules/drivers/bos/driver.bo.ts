import { DriverEntity } from '../entities/driver.entity';

export type CreateDriverBo = Pick<DriverEntity, 'name'>;
