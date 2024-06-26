import { Express } from 'express';
import { container } from 'tsyringe';

import { Module } from 'common/interfaces/module.interface';

import { DriverLocalRepository } from './repositories/driver.local.repository';
import { DriverRepository } from './repositories/driver.repository';
import { DriverRestController } from './rest-controllers/driver.rest-controller';
import { DriverRestRouter } from './rest-routers/driver.rest-router';
import { DriverService } from './services/driver.service';

export class DriverModule implements Module {
  public injectDependencies(): void {
    // Repositories
    container.registerSingleton<DriverRepository>(
      'DriverRepository',
      DriverLocalRepository,
    );

    // Services
    container.registerSingleton<DriverService>('DriverService', DriverService);

    // REST controllers
    container.registerSingleton<DriverRestController>(
      'DriverRestController',
      DriverRestController,
    );

    // REST routers
    container.registerSingleton<DriverRestRouter>(
      'DriverRestRouter',
      DriverRestRouter,
    );
  }

  public useRestRouter(app: Express): void {
    const restRouter = container.resolve<DriverRestRouter>('DriverRestRouter');
    app.use('/drivers', restRouter.getRouter());
  }
}
