import { Router } from 'express';
import { inject, injectable } from 'tsyringe';

import { RestRouter } from 'common/interfaces/router.inteface';
import { validatorMiddleware } from 'common/middlewares/validator.middleware';

import {
  CreateDriverDto,
  ReadDriverListDto,
  UpdateDriverDto,
} from '../dtos/driver.dto';
import { DriverRestController } from '../rest-controllers/driver.rest-controller';

@injectable()
export class DriverRestRouter implements RestRouter {
  constructor(
    @inject('DriverRestController')
    private readonly driverRestController: DriverRestController,
  ) {}

  public getRouter(): Router {
    const router = Router();

    router.post(
      '/',
      validatorMiddleware('body', CreateDriverDto),
      this.driverRestController.create.bind(this.driverRestController),
    );

    router.get(
      '/:id',
      this.driverRestController.readById.bind(this.driverRestController),
    );

    router.get(
      '/',
      validatorMiddleware('query', ReadDriverListDto),
      this.driverRestController.readList.bind(this.driverRestController),
    );

    router.put(
      '/:id',
      validatorMiddleware('body', UpdateDriverDto),
      this.driverRestController.update.bind(this.driverRestController),
    );

    router.delete(
      '/:id',
      this.driverRestController.delete.bind(this.driverRestController),
    );

    return router;
  }
}
