import { Express } from 'express';
import { container } from 'tsyringe';

import { Module } from 'common/interfaces/module.interface';

import { DriverLocalRepository } from './repositories/driver.local.repository';
import { DriverRepository } from './repositories/driver.repository';

export class DriverModule implements Module {
  public injectDependencies(): void {
    // Repositories
    container.registerSingleton<DriverRepository>(
      'DriverRepository',
      DriverLocalRepository,
    );

    // Services

    // REST controllers

    // REST routers
  }

  public useRestRouter(_app: Express): void {}
}
