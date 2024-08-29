import express from 'express';
import DishRouter from '../../modules/dish/infraestructure/dishRouter';
import CategoryRouter from '../../modules/category/infraestructure/categoryRouter';

export default class Router {
    router: any;
    dishRouter: DishRouter;
    categoryRouter: CategoryRouter;
    
    constructor(){
        this.router = express.Router();
        this.dishRouter = new DishRouter();
        this.categoryRouter = new CategoryRouter();
        this.setUpRoutes();
    }

    setUpRoutes(){
        this.router.use('/dish', this.dishRouter.getRouter());
        this.router.use('/category', this.categoryRouter.getRouter());
    }

    getRouter(): any {
        return this.router;
    }
}