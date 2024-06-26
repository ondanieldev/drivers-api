import { IsOptional, IsString } from 'class-validator';

import { CreateAutomobileBo } from '../bos/automobile.bo';
import { AutomobileEntity } from '../entities/automobile.entity';

export class CreateAutomobileDto implements CreateAutomobileBo {
  @IsString()
  brand: string;

  @IsString()
  color: string;

  @IsString()
  licensePlate: string;
}

export class ReadAutomobileListDto implements Partial<AutomobileEntity> {
  @IsString()
  @IsOptional()
  brand?: string;

  @IsString()
  @IsOptional()
  color?: string;
}

export class UpdateAutomobileDto extends CreateAutomobileDto {}
