import { Router } from 'express';
import { inject, injectable } from 'tsyringe';

import { RestRouter } from 'common/interfaces/router.inteface';
import { validatorMiddleware } from 'common/middlewares/validator.middleware';

import { StartAutomobileUsageDto } from '../dtos/automobile-usage.dto';
import { AutomobileUsageRestController } from '../rest-controllers/automobile-usage.rest-controller';

@injectable()
export class AutomobileUsageRestRouter implements RestRouter {
  constructor(
    @inject('AutomobileUsageRestController')
    private readonly automobileUsageRestController: AutomobileUsageRestController,
  ) {}

  public getRouter(): Router {
    const router = Router();

    router.post(
      '/start',
      validatorMiddleware('body', StartAutomobileUsageDto),
      this.automobileUsageRestController.start.bind(
        this.automobileUsageRestController,
      ),
    );

    router.post(
      '/finish/:id',
      this.automobileUsageRestController.finish.bind(
        this.automobileUsageRestController,
      ),
    );

    router.get(
      '/',
      this.automobileUsageRestController.readList.bind(
        this.automobileUsageRestController,
      ),
    );

    return router;
  }
}
