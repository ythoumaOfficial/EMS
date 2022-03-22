/** source/server.ts */
import http from 'http';
import express, { Express } from 'express';
import { connectToDatabase } from "./db/database"
import routes from './routes/expenses';
import * as swaggerUi from 'swagger-ui-express';
const swaggerFile = require('./../swagger-output.json');

const router: Express = express();

connectToDatabase()
    .then(() => {

        /** Logging */
        //TODO: Add Logging
        /** Parse the request */
        router.use(express.urlencoded({ extended: false }));
        /** Takes care of JSON data */
        router.use(express.json());

        /** RULES OF OUR API */
        router.use((req, res, next) => {
            // set the CORS policy
            res.header('Access-Control-Allow-Origin', '*');
            // set the CORS headers
            res.header('Access-Control-Allow-Headers', 'origin, X-Requested-With,Content-Type,Accept, Authorization');
            // set the CORS method headers
            if (req.method === 'OPTIONS') {
                res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST');
                return res.status(200).json({});
            }
            next();
        });

        /** Routes */
        router.use('/', routes);

        router.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))


        /** Error handling */
        router.use((req, res, next) => {
            const error = new Error('not found');
            return res.status(404).json({
                message: error.message
            });
        });

        /** Server */
        const httpServer = http.createServer(router);
        const PORT: any = process.env.PORT ?? 1987;
        httpServer.listen(PORT, () => console.log(`The server is running on port ${PORT}`));
    })
    .catch((error: Error) => {
        console.error("Database connection failed", error);
        process.exit();
    });

