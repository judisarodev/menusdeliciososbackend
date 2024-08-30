import express, { Router } from 'express';
import CategoryRepositoryImplementation from './categoryRepositoryImplementation';
import GetCategoriesUseCase from '../application/getCategoriesUseCase';
import CreateCategoryUseCase from '../application/createCategoryUseCase';
import { CategoryEntity } from '../domain/categoryEntity';
import authenticateRestaurant from '../../../middlewares/authenticateRestaurantMiddleware';

export default class CategoryRouter {
    router: Router;
    categoryRepositoryImplementation: CategoryRepositoryImplementation;
    getCategoriesUseCase: GetCategoriesUseCase;    
    createCategoryUseCase: CreateCategoryUseCase;

    constructor(){
        this.router = express.Router();

        // Category Repository Instance
        this.categoryRepositoryImplementation = new CategoryRepositoryImplementation();

        // Category Use Cases Instances
        this.getCategoriesUseCase = new GetCategoriesUseCase(this.categoryRepositoryImplementation);
        this.createCategoryUseCase = new CreateCategoryUseCase(this.categoryRepositoryImplementation);

        this.setUpRoutes();
    }

    setUpRoutes(){
        this.router.get('/get-all', authenticateRestaurant, async (req: any, res: any) => {
            try{
                const categories = await this.getCategoriesUseCase.execute();
                return res.status(200).json(categories);
            }catch(error){
                console.error(error);
                return res.status(200).json(error);
            }
        });

        this.router.post('/create', authenticateRestaurant, async (req: any, res: any) => {
            try{
                const { name, image, icon } = req.body;
                const categoryEntity = new CategoryEntity(name, image, icon);
                await this.createCategoryUseCase.execute(categoryEntity);
                return res.status(200).json({ message: 'Categoría creada con éxito' });
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