import { Express } from 'express';

import { Module } from 'common/interfaces/module.interface';

import { AutomobileModule } from 'modules/automobiles/automobile.module';
import { DriverModule } from 'modules/drivers/driver.module';

export class AppModule implements Module {
  private modules: Module[] = [new AutomobileModule(), new DriverModule()];

  injectDependencies(): void {
    this.modules.forEach((module) => module.injectDependencies());
  }

  useRestRouter(app: Express): void {
    this.modules.forEach((module) => module.useRestRouter(app));
  }
}
