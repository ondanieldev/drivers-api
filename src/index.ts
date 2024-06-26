import 'dotenv/config';

import cors from 'cors';
import express from 'express';
import helmet from 'helmet';

import { restApiConfig } from 'common/config/rest-api.config';
import { errorHandlerMiddleware } from 'common/middlewares/error-handler.middleware';
import { pathLoggerMiddleware } from 'common/middlewares/path-logger.middleware';

function bootstrap() {
  const { port } = restApiConfig();

  const restApi = express();

  restApi.use(cors()); // Enable CORS
  restApi.use(express.json()); // Enable JSON body parsing
  restApi.use(helmet()); // Enable security headers

  restApi.use(pathLoggerMiddleware); // Log all incoming requests

  restApi.use(errorHandlerMiddleware); // Will catch any errors and must be the last middleware added

  restApi.listen(port, () => {
    console.log(`REST API is running at http://localhost:${port}`);
  });
}

bootstrap();
