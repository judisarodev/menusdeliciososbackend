import express, { Router } from 'express';
import { DishRepositoryImplementation } from './dishRepositoryImplementation';
import GetAllDishesUseCase from './../application/getAllDishesUseCase';
import CreateDishUseCase from '../application/createDishUseCase';
import UpdateDishUseCase from '../application/updateDishUseCase';
import DeleteDishUseCase from '../application/deleteDishUseCase';
import CategoryRepositoryImplementation from '../../category/infraestructure/categoryRepositoryImplementation';
import GetCategoryByIdUseCase from '../../category/application/getCategoryByIdUseCase';
import { DishEntity } from '../domain/dishEntity';
import RouterPattern from '../../../domain/routerPattern';
import authenticateRestaurant from '../../../middlewares/authenticateRestaurantMiddleware';

export default class DishRouter implements RouterPattern {
    router: Router;
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
        this.router.get('/get-all', authenticateRestaurant, async (req: any, res: any) => {
            try{
                const restaurantId = req.restaurantId;
                const dishes = await this.getAllDishesUseCase.execute(restaurantId);
                return res.status(200).json(dishes);
            }catch(error){
                console.error(error);
                return res.status(200).json(error);
            }
        });

        this.router.post('/create', authenticateRestaurant, async (req: any, res: any) => {
            try{           
                const restaurantId = req.restaurantId;
                const { categoryId, name, price, description, image } = req.body;
                const categoryEntity = await this.getCategoryByIdUseCase.execute(categoryId, restaurantId);
                if(categoryEntity){
                    const dishEntity = new DishEntity(name, price, description, image);
                    dishEntity.setCategory(categoryEntity);
                    const createdDish = await this.createDishUseCase.execute(dishEntity);
                    return res.status(200).json(createdDish);
                }
                return res.status(200).json({ message: 'No fue posible insertar el producto' });
            }catch(error){
                console.error(error);
                return res.status(200).json(error);
            }
        });

        this.router.get('/update', authenticateRestaurant, async (req: any, res: any) => {
            try{
                //const dishes = await this.getAllDishesUseCase.execute();
                return res.status(200).json({ message: 'Servicio no implementado' });
            }catch(error){
                console.error(error);
                return res.status(200).json(error);
            }
        });

        this.router.get('/delete', async (req: any, res: any) => {
            try{
                //const dishes = await this.getAllDishesUseCase.execute();
                return res.status(200).json({ message: 'Servicio no implementado' });
            }catch(error){
                console.error(error);
                return res.status(200).json(error); 
            }
        });
    }

    getRouter(): Router {
        return this.router;
    }
}