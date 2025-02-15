import { Router } from 'express';
import { inject, injectable } from 'tsyringe';

import { RestRouter } from 'common/interfaces/router.inteface';
import { validatorMiddleware } from 'common/middlewares/validator.middleware';

import {
  CreateAutomobileDto,
  ReadAutomobileListDto,
  UpdateAutomobileDto,
} from '../dtos/automobile.dto';
import { AutomobileRestController } from '../rest-controllers/automobile.rest-controller';

@injectable()
export class AutomobileRestRouter implements RestRouter {
  constructor(
    @inject('AutomobileRestController')
    private readonly automobileRestController: AutomobileRestController,
  ) {}

  public getRouter(): Router {
    const router = Router();

    router.post(
      '/',
      validatorMiddleware('body', CreateAutomobileDto),
      this.automobileRestController.create.bind(this.automobileRestController),
    );

    router.get(
      '/:id',
      this.automobileRestController.readById.bind(
        this.automobileRestController,
      ),
    );

    router.get(
      '/',
      validatorMiddleware('query', ReadAutomobileListDto),
      this.automobileRestController.readList.bind(
        this.automobileRestController,
      ),
    );

    router.put(
      '/:id',
      validatorMiddleware('body', UpdateAutomobileDto),
      this.automobileRestController.update.bind(this.automobileRestController),
    );

    router.delete(
      '/:id',
      this.automobileRestController.delete.bind(this.automobileRestController),
    );

    return router;
  }
}
