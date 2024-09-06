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
import GetCategoriesUseCase from '../../category/application/getCategoriesUseCase';
import GetDishUseCase from '../application/getDishUseCase';

export default class DishRouter implements RouterPattern {
    router: Router;
    getAllDishesUseCase: GetAllDishesUseCase;
    createDishUseCase: CreateDishUseCase;
    updateDishUseCase: UpdateDishUseCase;
    deleteDishUseCase: DeleteDishUseCase;
    dishRepositoryImplementation: DishRepositoryImplementation;
    getCategoryByIdUseCase: GetCategoryByIdUseCase;
    categoryRepositoryImplementation: CategoryRepositoryImplementation;
    getCategoriesUseCase: GetCategoriesUseCase;
    getDishUseCase: GetDishUseCase;
    
    constructor(){
        this.router = express.Router();
        this.dishRepositoryImplementation = new DishRepositoryImplementation();
        this.getAllDishesUseCase = new GetAllDishesUseCase(this.dishRepositoryImplementation);
        this.createDishUseCase = new CreateDishUseCase(this.dishRepositoryImplementation);
        this.updateDishUseCase = new UpdateDishUseCase(this.dishRepositoryImplementation);
        this.deleteDishUseCase = new DeleteDishUseCase(this.dishRepositoryImplementation);

        this.categoryRepositoryImplementation = new CategoryRepositoryImplementation();
        this.getCategoryByIdUseCase = new GetCategoryByIdUseCase(this.categoryRepositoryImplementation);
        this.getCategoriesUseCase = new GetCategoriesUseCase(this.categoryRepositoryImplementation);

        this.getDishUseCase = new GetDishUseCase(this.dishRepositoryImplementation);

        this.setUpRoutes();
    }

    setUpRoutes(){
        this.router.get('/get-all', authenticateRestaurant, async (req: any, res: any) => {
            try{
                const restaurantId = req.restaurantId;
                const categories = await this.getCategoriesUseCase.execute(restaurantId);
                const dishes = await this.getAllDishesUseCase.execute(categories);
                return res.status(200).json(dishes);
            }catch(error){
                console.error(error);
                return res.status(200).json(error);
            }
        });

        this.router.get('/get/:dishId', authenticateRestaurant, async (req: any, res: any) => {
            try{
                const { dishId } = req.params;
                const dishEntity = await this.getDishUseCase.execute(dishId);
                return res.status(200).json(dishEntity);
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
                    return res.status(200).json({
                        description: dishEntity.getDescription(),
                        name: dishEntity.getName(),
                        price: dishEntity.getPrice(),
                        image: dishEntity.getImage(),
                        category: {
                            categoryId: categoryEntity.getCategoryId(),
                            name: categoryEntity.getName(),
                            image: categoryEntity.getImage(),
                            icon: categoryEntity.getIcon(),
                        }
                    });
                }
                return res.status(200).json({ message: 'No fue posible insertar el producto' });
            }catch(error){
                console.error(error);
                return res.status(200).json(error);
            }
        });

        this.router.patch('/update', authenticateRestaurant, async (req: any, res: any) => {
            try{
                const { dishId, data } = req.body;
                await this.updateDishUseCase.execute(dishId, data);
                return res.status(200).json({ message: 'Producto actualizado' });
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