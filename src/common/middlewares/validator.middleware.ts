import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';

import { ClassType } from 'common/types/class.type';

export function validatorMiddleware<T>(
  segment: 'body' | 'query',
  targetClass: ClassType<T>,
) {
  return async (req: Request, _res: Response, next: NextFunction) => {
    // To make validate works, we need to make req[segment] to be an instance of targetClass
    req[segment] = Object.setPrototypeOf(req[segment], targetClass.prototype);

    // Validate class-validator decorators
    const errors = await validate(req[segment], {
      whitelist: true,
      forbidNonWhitelisted: true,
    });
    if (errors.length > 0) {
      throw errors;
    }

    // Apply class-transformer decorators
    req.body = plainToClass(targetClass, req[segment]);

    next();
  };
}
