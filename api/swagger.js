const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Gestión de Turnos',
      version: '1.0.0',
      description: 'API para gestión de usuarios y turnos/tickets',
      contact: {
        name: 'Soporte API',
        email: 'soporte@ejemplo.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor de desarrollo'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Ingrese el token JWT obtenido del login'
        }
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            id_user: {
              type: 'integer',
              description: 'ID único del usuario'
            },
            name: {
              type: 'string',
              description: 'Nombre del usuario'
            },
            lastname: {
              type: 'string',
              description: 'Apellido del usuario'
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Email del usuario'
            },
            type: {
              type: 'string',
              enum: ['user', 'admin'],
              description: 'Tipo de usuario'
            }
          }
        },
        Turno: {
          type: 'object',
          properties: {
            id_ticket: {
              type: 'integer',
              description: 'ID único del turno'
            },
            id_user: {
              type: 'integer',
              description: 'ID del usuario que creó el turno'
            },
            dateCreated: {
              type: 'string',
              format: 'date-time',
              description: 'Fecha de creación del turno'
            },
            deliveryTime: {
              type: 'string',
              format: 'date-time',
              description: 'Fecha de entrega/finalización'
            },
            status: {
              type: 'string',
              description: 'Estado del turno'
            },
            description: {
              type: 'string',
              description: 'Descripción del turno'
            }
          }
        },
        Error: {
          type: 'object',
          properties: {
            error: {
              type: 'string',
              description: 'Mensaje de error'
            }
          }
        },
        Success: {
          type: 'object',
          properties: {
            ok: {
              type: 'boolean',
              description: 'Indica si la operación fue exitosa'
            },
            user: {
              type: 'object',
              description: 'Datos del resultado'
            }
          }
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  apis: ['./routes/*.js', './controllers/*.js']
};

const specs = swaggerJsdoc(options);

module.exports = { specs, swaggerUi };