import { Express } from 'express';

import { Module } from 'common/interfaces/module.interface';

import { AutomobileModule } from 'modules/automobiles/automobile.module';

export class AppModule implements Module {
  private modules: Module[] = [new AutomobileModule()];

  injectDependencies(): void {
    this.modules.forEach((module) => module.injectDependencies());
  }

  useRestRouter(app: Express): void {
    this.modules.forEach((module) => module.useRestRouter(app));
  }
}
