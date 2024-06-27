import { Express } from 'express';

/**
 * Interface for modules.
 * Using modules allows for better separation of concerns and centralize dependency injection and route attachment.
 */
export interface Module {
  /**
   * Inject all module's dependencies.
   * This method must be called before using any other method of the module.
   * In case of needing to replace a dependency, if it implements the same interface, it can be done here without changing the rest of the code.
   */
  injectDependencies(): void;

  /**
   * Attach routes to the app.
   * @param app Express app.
   */
  registerRestRouter: (app: Express) => void;
}
