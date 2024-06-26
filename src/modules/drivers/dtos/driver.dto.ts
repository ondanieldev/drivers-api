import { IsOptional, IsString } from 'class-validator';

import { CreateDriverBo } from '../bos/driver.bo';
import { DriverEntity } from '../entities/driver.entity';

export class CreateDriverDto implements CreateDriverBo {
  @IsString()
  name: string;
}

export class ReadDriverListDto implements Partial<DriverEntity> {
  @IsString()
  @IsOptional()
  name?: string;
}

export class UpdateDriverDto extends CreateDriverDto {}
