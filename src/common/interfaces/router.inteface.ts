import { Router } from 'express';

export interface RestRouter {
  getRouter: () => Router;
}
