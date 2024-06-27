import { Router } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import { swaggerConfig } from './config/swagger.config';

const specs = swaggerJsdoc(swaggerConfig);

const swaggerRouter = Router();

swaggerRouter.use('/api', swaggerUi.serve, swaggerUi.setup(specs));

export { swaggerRouter };
