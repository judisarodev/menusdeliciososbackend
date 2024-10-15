import express, { Router } from 'express';
import CategoryRepositoryImplementation from './categoryRepositoryImplementation';
import CreateCategoryUseCase from '../application/createCategoryUseCase';
import { CategoryEntity } from '../domain/categoryEntity';
import authorizeRestaurant from '../../../middlewares/authorizeRestaurantMiddleware';
import RestaurantRepositoryImplementation from '../../restaurant/infraestructure/restaurantRepositoryImplementation';

export default class CategoryRouter {
    router: Router;
    categoryRepositoryImplementation: CategoryRepositoryImplementation;
    createCategoryUseCase: CreateCategoryUseCase;
    restaurantRepositoryImplementation: RestaurantRepositoryImplementation;
    storage: any;
    uploadMiddleware: any;
        
    constructor(){
        this.router = express.Router();

        // Category Repository Instance
        this.categoryRepositoryImplementation = new CategoryRepositoryImplementation();
        this.restaurantRepositoryImplementation = new RestaurantRepositoryImplementation();

        // Category Use Cases Instances
        this.createCategoryUseCase = new CreateCategoryUseCase(this.categoryRepositoryImplementation);
        this.setUpRoutes();
    }

    setUpRoutes(){
        this.router.use('/get-image', express.static('images/categories'));
        this.router.post('/create', authorizeRestaurant, async (req: any, res: any) => {
            try{
                const { name, icon, menuId } = req.body;
                const categoryEntity = new CategoryEntity(name, icon);
                const { response, status } = await this.createCategoryUseCase.execute(categoryEntity, menuId);
                return res.status(status).json(response)
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