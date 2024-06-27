import { NextFunction, Request, Response } from 'express';

import { logger } from 'common/utils/logger';

export function pathLoggerMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  logger.info(`${req.method.toUpperCase()} ${req.path}`);
  next();
}
