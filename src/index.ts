import 'express-async-errors';
import 'dotenv/config';
import 'reflect-metadata';

import cors from 'cors';
import express from 'express';
import helmet from 'helmet';

import { restApiConfig } from 'common/config/rest-api.config';
import { errorHandlerMiddleware } from 'common/middlewares/error-handler.middleware';
import { pathLoggerMiddleware } from 'common/middlewares/path-logger.middleware';
import { logger } from 'common/utils/logger';

import { AppModule } from 'modules/app/app.module';

import { swaggerRouter } from 'providers/swagger/swagger.index';

function bootstrap() {
  const { port } = restApiConfig();

  const restApi = express();

  // Enable CORS
  restApi.use(cors());

  // Enable JSON body parsing
  restApi.use(express.json());

  // Enable security headers
  restApi.use(helmet());

  // Log all incoming requests
  restApi.use(pathLoggerMiddleware);

  // Setup swagger
  restApi.use(swaggerRouter);

  // Inject dependencies and register REST routers
  const appModule = new AppModule();
  appModule.injectDependencies();
  appModule.registerRestRouter(restApi);

  // Will catch any errors and must be the last middleware added
  restApi.use(errorHandlerMiddleware);

  // Start the server
  restApi.listen(port, () => {
    logger.info(`REST API is running at http://localhost:${port}`);
  });
}

bootstrap();
