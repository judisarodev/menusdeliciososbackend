import * as dotenv from 'dotenv';
// Carga las variables de entorno desde el archivo .env
dotenv.config();

// src/app.ts
import express, { Request, Response } from 'express';
import DataBaseSetUp from './infraestructure/config/sequelize';
import { GetAllDishes } from './modules/dish/application/getAllDishes';


const app = express();
const port = 8000;

app.get('/get-dishes', async (req: Request, res: Response) => {
    try{
        //sequelize.authenticate();
        const getAllDishes = new GetAllDishes();
        const d = await getAllDishes.getAll();
        console.log('Connection has been established successfully.');
        return res.status(200).json({message: 'success', d});
    }catch(error){
        console.error('Unable to connect to the database:', error);
        return res.status(500).json({message: 'fail'});
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
