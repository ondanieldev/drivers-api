import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';

import { ClassType } from 'common/types/class.type';

export function validatorMiddleware<T>(
  segment: 'body' | 'query',
  targetClass: ClassType<T>,
) {
  return async (req: Request, _res: Response, next: NextFunction) => {
    req[segment] = Object.setPrototypeOf(req[segment], targetClass.prototype);
    const errors = await validate(req[segment], {
      whitelist: true,
      forbidNonWhitelisted: true,
    });
    if (errors.length > 0) {
      throw errors;
    }
    req.body = plainToClass(targetClass, req[segment]);
    next();
  };
}
