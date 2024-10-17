import swaggerJSDoc from "swagger-jsdoc";
// import path from "path";

// Opciones para Swagger JSDoc
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Hexagonal architecture API example',
            version: '1.0.0',
            description: 'Documentación de la API usada como ejemplo de desarrollo para arquitectura hexagonal',
            contact: {
                name: "SKRTEEEEEE",
                url: "profile-skrt.vercel.app",
                email: "adanreh.m@gmail.com"
            }
        },
        servers: [
            {
                url: 'http://localhost:3000',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT', // Opcional, pero recomendado
                },
            },
        },
    },
    apis: ["./interface/routes/*.ts", "./interface/controllers/*.ts"]
};


// Generar la especificación Swagger
export const swaggerDocs = swaggerJSDoc(swaggerOptions);