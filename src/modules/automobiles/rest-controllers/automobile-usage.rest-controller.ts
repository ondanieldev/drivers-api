import { Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';

import { StatusCode } from 'common/enums/status-code.enum';

import { AutomobileUsageService } from '../services/automobile-usage.service';

@injectable()
export class AutomobileUsageRestController {
  constructor(
    @inject('AutomobileUsageService')
    private readonly automobileUsageService: AutomobileUsageService,
  ) {}

  public async start(req: Request, res: Response): Promise<Response> {
    const result = await this.automobileUsageService.start(req.body);
    return res.status(StatusCode.CREATED).json(result);
  }

  public async finish(req: Request, res: Response): Promise<Response> {
    const result = await this.automobileUsageService.finish(req.params.id);
    return res.status(StatusCode.OK).json(result);
  }

  public async readList(req: Request, res: Response): Promise<Response> {
    const result = await this.automobileUsageService.readList();
    return res.status(StatusCode.OK).json(result);
  }
}
