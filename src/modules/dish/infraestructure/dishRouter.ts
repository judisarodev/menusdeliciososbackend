import express, { Router } from 'express';
import { DishRepositoryImplementation } from './dishRepositoryImplementation';
import GetAllDishesUseCase from './../application/getAllDishesUseCase';
import CreateDishUseCase from '../application/createDishUseCase';
import UpdateDishUseCase from '../application/updateDishUseCase';
import DeleteDishUseCase from '../application/deleteDishUseCase';
import CategoryRepositoryImplementation from '../../category/infraestructure/categoryRepositoryImplementation';
import GetCategoryByIdUseCase from '../../category/application/getCategoryByIdUseCase';
import { CategoryEntity } from '../../category/domain/categoryEntity';
import { DishEntity } from '../domain/dishEntity';

export default class DishRouter {
    router: any;
    getAllDishesUseCase: GetAllDishesUseCase;
    createDishUseCase: CreateDishUseCase;
    updateDishUseCase: UpdateDishUseCase;
    deleteDishUseCase: DeleteDishUseCase;
    dishRepositoryImplementation: DishRepositoryImplementation;
    getCategoryByIdUseCase: GetCategoryByIdUseCase;
    categoryRepositoryImplementation: CategoryRepositoryImplementation;
    

    constructor(){
        this.router = express.Router();

        // Dish Repository Instance
        this.dishRepositoryImplementation = new DishRepositoryImplementation();
        // Dish Use Cases Instances
        this.getAllDishesUseCase = new GetAllDishesUseCase(this.dishRepositoryImplementation);
        this.createDishUseCase = new CreateDishUseCase(this.dishRepositoryImplementation);
        this.updateDishUseCase = new UpdateDishUseCase(this.dishRepositoryImplementation);
        this.deleteDishUseCase = new DeleteDishUseCase(this.dishRepositoryImplementation);

        // Category Repository Instance
        this.categoryRepositoryImplementation = new CategoryRepositoryImplementation();
        // Category Use Cases Instances
        this.getCategoryByIdUseCase = new GetCategoryByIdUseCase(this.categoryRepositoryImplementation);

        this.setUpRoutes();
    }

    setUpRoutes(){
        this.router.get('/get-all', async (req: any, res: any) => {
            try{
                const dishes = await this.getAllDishesUseCase.execute();
                return res.status(200).json(dishes);
            }catch(error){
                console.error(error);
                throw error;
            }
        });

        this.router.post('/create', async (req: any, res: any) => {
            try{
                const {
                    categoryId, 
                    name, 
                    price, 
                    description, 
                    image
                } = req.body;

                const category = await this.getCategoryByIdUseCase.execute(categoryId);
                const dish = new DishEntity(category, name, price, description, image);

                const createdDish = await this.createDishUseCase.execute(dish);
                return res.status(200).json(createdDish);
            }catch(error){
                console.error(error);
                throw error;
            }
        });

        this.router.get('/update', async (req: any, res: any) => {
            try{
                const dishes = await this.getAllDishesUseCase.execute();
                return res.status(200).json(dishes);
            }catch(error){
                console.error(error);
                throw error;
            }
        });

        this.router.get('/delete', async (req: any, res: any) => {
            try{
                const dishes = await this.getAllDishesUseCase.execute();
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