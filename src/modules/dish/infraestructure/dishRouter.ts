import express, { Router } from 'express';
import { GetAllDishesUseCase } from './../application/getAllDishesUseCase';

export default class DishRouter {
    router: any;
    getAllDishesUseCase: GetAllDishesUseCase;

    constructor(){
        this.router = express.Router();
        this.getAllDishesUseCase = new GetAllDishesUseCase();

        this.setUpRoutes();
    }

    setUpRoutes(){
        this.router.get('/get-dishes', async (req: any, res: any) => {
            try{
                const dishes = await this.getAllDishesUseCase.getAll();
                return res.status(200).json(dishes);
            }catch(error){
                console.error(error);
                throw error;
            }
        });
    }

    getRouter(): Router {
        return this.router;
    }
}