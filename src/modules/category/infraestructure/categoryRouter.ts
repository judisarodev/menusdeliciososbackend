import express, { Router } from 'express';
import CategoryRepositoryImplementation from './categoryRepositoryImplementation';
import GetCategoriesUseCase from '../application/getCategoriesUseCase';
import CreateCategoryUseCase from '../application/createCategoryUseCase';
import { CategoryEntity } from '../domain/categoryEntity';
import authenticateRestaurant from '../../../middlewares/authenticateRestaurantMiddleware';
import RestaurantRepositoryImplementation from '../../restaurant/infraestructure/restaurantRepositoryImplementation';

export default class CategoryRouter {
    router: Router;
    categoryRepositoryImplementation: CategoryRepositoryImplementation;
    getCategoriesUseCase: GetCategoriesUseCase;    
    createCategoryUseCase: CreateCategoryUseCase;
    restaurantRepositoryImplementation: RestaurantRepositoryImplementation;

    constructor(){
        this.router = express.Router();

        // Category Repository Instance
        this.categoryRepositoryImplementation = new CategoryRepositoryImplementation();

        this.restaurantRepositoryImplementation = new RestaurantRepositoryImplementation();

        // Category Use Cases Instances
        this.getCategoriesUseCase = new GetCategoriesUseCase(this.categoryRepositoryImplementation);
        this.createCategoryUseCase = new CreateCategoryUseCase(this.categoryRepositoryImplementation);

        this.setUpRoutes();
    }

    setUpRoutes(){
        this.router.get('/get-all', authenticateRestaurant, async (req: any, res: any) => {
            try{
                const restaurantId = req.restaurantId;
                const categories = await this.getCategoriesUseCase.execute(restaurantId);
                return res.status(200).json(categories);
            }catch(error){
                console.error(error);
                return res.status(200).json(error);
            }
        });

        this.router.post('/create', authenticateRestaurant, async (req: any, res: any) => {
            try{
                const restaurantId = req.restaurantId;    
                const { name, image, icon } = req.body;
                const restaurant = await this.restaurantRepositoryImplementation.getById(restaurantId);
                if(restaurant){
                    const categoryEntity = new CategoryEntity(name, image, icon);
                    categoryEntity.setRestaurant(restaurant);
                    await this.createCategoryUseCase.execute(categoryEntity, restaurantId);
                    return res.status(200).json({ message: 'Categoría creada con éxito.' });
                }else {
                    return res.status(200).json({ message: 'No fue posible crear la categoría.' });
                }
            }catch(error){
                console.error(error);
                return res.status(200).json(error);
            }
        });
    }

    getRouter(): any {
        return this.router;
    }
}