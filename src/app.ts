import Router from './infraestructure/router/router';
import express, { Request, Response } from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerOptions from './swagger'; 

const app = express();
const port = 8000;
const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const router = new Router();
app.use(express.json());
app.use(cors());
app.use('/api', router.getRouter());


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
