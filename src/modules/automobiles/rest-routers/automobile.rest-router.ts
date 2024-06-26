import { Router } from 'express';
import { inject, injectable } from 'tsyringe';

import { RestRouter } from 'common/interfaces/router.inteface';

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
      '/automobile',
      this.automobileRestController.create.bind(this.automobileRestController),
    );

    return router;
  }
}
