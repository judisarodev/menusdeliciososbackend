import express, { Router } from 'express';
import CategoryRepositoryImplementation from './categoryRepositoryImplementation';
import GetCategoriesUseCase from '../application/getCategoriesUseCase';

export default class CategoryRouter {
    router: any;
    categoryRepositoryImplementation: CategoryRepositoryImplementation;
    getCategoriesUseCase: GetCategoriesUseCase;    

    constructor(){
        this.router = express.Router();

        // Category Repository Instance
        this.categoryRepositoryImplementation = new CategoryRepositoryImplementation();

        // Category Use Cases Instances
        this.getCategoriesUseCase = new GetCategoriesUseCase(this.categoryRepositoryImplementation);

        this.setUpRoutes();
    }

    setUpRoutes(){
        this.router.get('/get-all', async (req: any, res: any) => {
            try{
                const categories = await this.getCategoriesUseCase.execute();
                return res.status(200).json(categories);
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