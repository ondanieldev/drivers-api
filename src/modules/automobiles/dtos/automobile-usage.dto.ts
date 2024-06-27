import { Transform } from 'class-transformer';
import { IsString } from 'class-validator';

import { StartAutomobileUsageBo } from '../bos/automobile-usage.bo';

export class StartAutomobileUsageDto implements StartAutomobileUsageBo {
  @IsString()
  automobileId: string;

  @IsString()
  driverId: string;

  @IsString()
  @Transform(({ value }) => value.trim())
  reason: string;
}
