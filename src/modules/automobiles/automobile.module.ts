import { Express } from 'express';
import { container } from 'tsyringe';

import { Module } from 'common/interfaces/module.interface';

import { AutomobileLocalRepository } from './repositories/automobile-local.repository';
import { AutomobileUsageLocalRepository } from './repositories/automobile-usage.local.repository';
import { AutomobileUsageRepository } from './repositories/automobile-usage.repository';
import { AutomobileRepository } from './repositories/automobile.repository';
import { AutomobileUsageRestController } from './rest-controllers/automobile-usage.rest-controller';
import { AutomobileRestController } from './rest-controllers/automobile.rest-controller';
import { AutomobileUsageRestRouter } from './rest-routers/automobile-usage.rest-router';
import { AutomobileRestRouter } from './rest-routers/automobile.rest-router';
import { AutomobileUsageService } from './services/automobile-usage.service';
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
    container.registerSingleton<AutomobileUsageService>(
      'AutomobileUsageService',
      AutomobileUsageService,
    );

    // REST controllers
    container.registerSingleton<AutomobileRestController>(
      'AutomobileRestController',
      AutomobileRestController,
    );
    container.registerSingleton<AutomobileUsageRestController>(
      'AutomobileUsageRestController',
      AutomobileUsageRestController,
    );

    // REST routers
    container.registerSingleton<AutomobileRestRouter>(
      'AutomobileRestRouter',
      AutomobileRestRouter,
    );
    container.registerSingleton<AutomobileUsageRestRouter>(
      'AutomobileUsageRestRouter',
      AutomobileUsageRestRouter,
    );
  }

  public useRestRouter(app: Express): void {
    const automobileUsageRestRouter =
      container.resolve<AutomobileUsageRestRouter>('AutomobileUsageRestRouter');
    app.use('/automobiles/usages', automobileUsageRestRouter.getRouter());

    const automobileRestRouter = container.resolve<AutomobileRestRouter>(
      'AutomobileRestRouter',
    );
    app.use('/automobiles', automobileRestRouter.getRouter());
  }
}
