import { Express } from 'express';

/**
 * Interface for modules.
 * Using modules allows for better separation of concerns and centralize dependency injection and route attachment.
 */
export interface Module {
  /**
   * Inject all module's dependencies.
   */
  injectDependencies(): void;

  /**
   * Attach routes to the app.
   * @param app Express app.
   */
  useRestRouter: (app: Express) => void;
}
