import { Express } from 'express';

export interface Module {
  injectDependencies(): void;
  useRestRouter: (app: Express) => void;
}
