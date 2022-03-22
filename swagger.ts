const swaggerAutogen = require('swagger-autogen')()

const doc = {
    info: {
        version: "0.0.1",
        title: "Expense Management System (EMS)",
        description: "Documentation for NodeJS Backend Developer Technical Test"
    },
    host: "localhost:1987",
    basePath: "/",
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
        {
            "name": "Expense",
            "description": "Endpoints"
        }
    ],
    definitions: {
        Expense: {
            "description": "Meat",
            "value": 12500.25,
            "type": {
                '@enum': ["Entertainment", "Food", "Bills", "Transport", "Other"]
            }
        }
    }
}

const outputFile = './swagger-output.json'
const endpointsFiles = ['./source/routes/expenses']

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
})