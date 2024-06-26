import { Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';

import { StatusCode } from 'common/enums/status-code.enum';

import { DriverService } from '../services/driver.service';

@injectable()
export class DriverRestController {
  constructor(
    @inject('DriverService')
    private readonly driverService: DriverService,
  ) {}

  public async create(req: Request, res: Response): Promise<Response> {
    const result = await this.driverService.create(req.body);
    return res.status(StatusCode.CREATED).json(result);
  }

  public async readById(req: Request, res: Response): Promise<Response> {
    const result = await this.driverService.readById(req.params.id);
    return res.status(StatusCode.OK).json(result);
  }

  public async readList(req: Request, res: Response): Promise<Response> {
    const result = await this.driverService.readList(req.query);
    return res.status(StatusCode.OK).json(result);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const result = await this.driverService.update({
      data: req.body,
      id: req.params.id,
    });
    return res.status(StatusCode.OK).json(result);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    await this.driverService.delete(req.params.id);
    return res.status(StatusCode.NO_CONTENT).json({});
  }
}
