const swaggerAutogen = require('swagger-autogen')()

const doc = {
    info: {
        version: "1.0.0",
        title: "My API",
        description: "Documentation automatically generated by the <b>swagger-autogen</b> module."
    },
    host: "localhost:1987",
    basePath: "/",
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
        {
            "name": "Expenses",
            "description": "Endpoints"
        }
    ],
    securityDefinitions: {
        apiKeyAuth: {
            type: "apiKey",
            in: "header",       // can be "header", "query" or "cookie"
            name: "X-API-KEY",  // name of the header, query parameter or cookie
            description: "any description..."
        }
    },
    definitions: {
        Expenses: {
            "description": "Meat",
            "value": 12500.25,
            "type": "Food"
        }
    }
}

const outputFile = './swagger-output.json'
const endpointsFiles = ['./source/routes/expenses']

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./source/server.ts')
})