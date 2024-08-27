import * as dotenv from 'dotenv';
// Carga las variables de entorno desde el archivo .env
dotenv.config();

// src/app.ts
import express, { Request, Response } from 'express';
import DataBaseSetUp from './infraestructure/config/database';


const app = express();
const port = 8000;

app.get('/', async (req: Request, res: Response) => {
    try{
        const db = new DataBaseSetUp();
        db.setUp();
        const sequelize = db.getSequelize();
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        return res.status(200).json({message: 'success'});
    }catch(error){
        console.error('Unable to connect to the database:', error);
        return res.status(500).json({message: 'fail'});
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
