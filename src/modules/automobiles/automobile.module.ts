import { Express } from 'express';
import { container } from 'tsyringe';

import { Module } from 'common/interfaces/module.interface';

import { AutomobileLocalRepository } from './repositories/automobile-local.repository';
import { AutomobileUsageLocalRepository } from './repositories/automobile-usage.local.repository';
import { AutomobileUsageRepository } from './repositories/automobile-usage.repository';
import { AutomobileRepository } from './repositories/automobile.repository';
import { AutomobileRestController } from './rest-controllers/automobile.rest-controller';
import { AutomobileRestRouter } from './rest-routers/automobile.rest-router';
import { AutomobileService } from './services/automobile.service';

export class AutomobileModule implements Module {
  public injectDependencies(): void {
    // Repositories
    container.registerSingleton<AutomobileRepository>(
      'AutomobileRepository',
      AutomobileLocalRepository,
    );
    container.registerSingleton<AutomobileUsageRepository>(
      'AutomobileUsageRepository',
      AutomobileUsageLocalRepository,
    );

    // Services
    container.registerSingleton<AutomobileService>(
      'AutomobileService',
      AutomobileService,
    );

    // REST controllers
    container.registerSingleton<AutomobileRestController>(
      'AutomobileRestController',
      AutomobileRestController,
    );

    // REST routers
    container.registerSingleton<AutomobileRestRouter>(
      'AutomobileRestRouter',
      AutomobileRestRouter,
    );
  }

  public useRestRouter(app: Express): void {
    const restRouter = container.resolve<AutomobileRestRouter>(
      'AutomobileRestRouter',
    );
    app.use(restRouter.getRouter());
  }
}
