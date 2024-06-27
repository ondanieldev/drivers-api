import { restApiConfig } from 'common/config/rest-api.config';

export const swaggerConfig = () => {
  const servers = [];

  if (process.env.NODE_ENV === 'development') {
    servers.push({
      url: `http://localhost:${restApiConfig().port}`,
    });
  }

  servers.push({
    url: 'https://drivers-api.ondaniel.com.br',
  });

  return {
    definition: {
      openapi: '3.1.0',
      info: {
        title: 'Drivers API',
        version: '1.0.0',
        description: 'A RESTful API to manage automobiles, drivers and usages',
        license: {
          name: 'MIT',
          url: 'https://github.com/ondanieldev/drivers-api/blob/HEAD/LICENSE',
        },
        contact: {
          name: 'ondanieldev',
          url: 'https://ondaniel.com.br',
          email: 'me@ondaniel.com.br',
        },
      },
      servers,
    },
    apis: [
      './**/*.dto.swagger.{js,ts}',
      './**/*.entity.swagger.{js,ts}',
      './**/*.rest-router.swagger.{js,ts}',
    ],
  };
};
