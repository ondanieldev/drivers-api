import { Transform } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

import { CreateAutomobileBo } from '../bos/automobile.bo';
import { AutomobileEntity } from '../entities/automobile.entity';

export class CreateAutomobileDto implements CreateAutomobileBo {
  @IsString()
  @Transform(({ value }) => value.trim())
  brand: string;

  @IsString()
  @Transform(({ value }) => value.trim())
  color: string;

  @IsString()
  @Transform(({ value }) => value.trim())
  licensePlate: string;
}

export class ReadAutomobileListDto implements Partial<AutomobileEntity> {
  @IsString()
  @IsOptional()
  @Transform(({ value }) => value.trim())
  brand?: string;

  @IsString()
  @IsOptional()
  @Transform(({ value }) => value.trim())
  color?: string;
}

export class UpdateAutomobileDto extends CreateAutomobileDto {}
