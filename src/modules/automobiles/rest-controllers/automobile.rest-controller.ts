import { Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';

import { StatusCode } from 'common/enums/status-code.enum';

import { AutomobileService } from '../services/automobile.service';

@injectable()
export class AutomobileRestController {
  constructor(
    @inject('AutomobileService')
    private readonly automobileService: AutomobileService,
  ) {}

  public async create(req: Request, res: Response): Promise<Response> {
    const result = await this.automobileService.create(req.body);
    return res.status(StatusCode.CREATED).json(result);
  }

  public async readById(req: Request, res: Response): Promise<Response> {
    const result = await this.automobileService.readById(req.params.id);
    return res.status(StatusCode.OK).json(result);
  }

  public async readList(req: Request, res: Response): Promise<Response> {
    const result = await this.automobileService.readList(req.query);
    return res.status(StatusCode.OK).json(result);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const result = await this.automobileService.update({
      data: req.body,
      id: req.params.id,
    });
    return res.status(StatusCode.OK).json(result);
  }
}
