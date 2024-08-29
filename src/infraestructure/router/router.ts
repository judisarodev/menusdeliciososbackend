import express from 'express';
import DishRouter from '../../modules/dish/infraestructure/dishRouter';
import CategoryRouter from '../../modules/category/infraestructure/categoryRouter';
import RouterPattern from './routerPattern';
import RestaurantTypeRouter from '../../modules/restaurant_type/infraestructure/restaurantTypeRouter';

export default class Router implements RouterPattern{
    router: any;
    dishRouter: DishRouter;
    categoryRouter: CategoryRouter;
    restaurantTypeRouter: RestaurantTypeRouter;
    
    constructor(){
        this.router = express.Router();
        this.dishRouter = new DishRouter();
        this.categoryRouter = new CategoryRouter();
        this.restaurantTypeRouter = new RestaurantTypeRouter();
        this.setUpRoutes();
    }

    setUpRoutes(){
        this.router.use('/dish', this.dishRouter.getRouter());
        this.router.use('/category', this.categoryRouter.getRouter());
        this.router.use('/restaurant-type', this.restaurantTypeRouter.getRouter());
    }

    getRouter(): any {
        return this.router;
    }
}