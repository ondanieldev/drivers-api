import { IsString } from 'class-validator';

import { StartAutomobileUsageBo } from '../bos/automobile-usage.bo';

export class StartAutomobileUsageDto implements StartAutomobileUsageBo {
  @IsString()
  automobileId: string;

  @IsString()
  driverId: string;

  @IsString()
  reason: string;
}
