
const swaggerOptions: any = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Menús deliciosos documentation',
      version: '1.0.0',
      description: 'Documentación de la API de menús deliciosos',
      contact: {
        name: 'Juan Diego Sánchez Rodríguez',
      },
      servers: [
        {
          url: 'http://localhost:8000', 
        },
      ],
    },
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'Bearer',
          bearerFormat: 'JWT',
        },
        BasicAuth: {
          type: 'http',
          scheme: 'Basic',
        },
      },
    }
  },
  apis: ['./**/*.ts'], 
};

export default swaggerOptions;
