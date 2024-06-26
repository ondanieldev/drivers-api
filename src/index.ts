import 'dotenv/config';

import cors from 'cors';
import express from 'express';
import helmet from 'helmet';

import { restApiConfig } from 'common/config/rest-api.config';

function bootstrap() {
  const { port } = restApiConfig();

  const restApi = express();

  restApi.use(cors()); // Enable CORS
  restApi.use(express.json()); // Enable JSON body parsing
  restApi.use(helmet()); // Enable security headers

  restApi.listen(port, () => {
    console.log(`REST API is running at http://localhost:${port}`);
  });
}

bootstrap();
