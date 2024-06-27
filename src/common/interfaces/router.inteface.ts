import { Router } from 'express';

/**
 * Interface for REST routers.
 */
export interface RestRouter {
  /**
   * Get the Express Router with all routes defined on this method attached to it.
   * @returns Express Router
   */
  getRouter: () => Router;
}
