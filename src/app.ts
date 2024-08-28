import * as dotenv from 'dotenv';
import Router from './infraestructure/router/router';
import express, { Request, Response } from 'express';
dotenv.config();

const app = express();
const port = 8000;

const router = new Router();
app.use('/api', router.getRouter());

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
