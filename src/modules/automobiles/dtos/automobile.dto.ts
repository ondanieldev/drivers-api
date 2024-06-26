import { IsString } from 'class-validator';

import { CreateAutomobileBo } from '../bos/automobile.bo';

export class CreateAutomobileDto implements CreateAutomobileBo {
  @IsString()
  brand: string;

  @IsString()
  color: string;

  @IsString()
  licensePlate: string;
}

export class UpdateAutomobileDto extends CreateAutomobileDto {}
