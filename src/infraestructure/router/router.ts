import express from 'express';
import DishRouter from '../../modules/dish/infraestructure/dishRouter';
import CategoryRouter from '../../modules/category/infraestructure/categoryRouter';
import RouterPattern from '../../domain/routerPattern';
import RestaurantTypeRouter from '../../modules/restaurant_type/infraestructure/restaurantTypeRouter';
import PhoneRouter from '../../modules/phone/infraestructure/phoneRouter';
import AddressRouter from '../../modules/address/infraestructure/addressRouter';
import RestaurantRouter from '../../modules/restaurant/infraestructure/restaurantRouter';
import authenticateRestaurant from '../../middlewares/authenticateRestaurantMiddleware';

export default class Router implements RouterPattern{
    router: any;
    dishRouter: DishRouter;
    categoryRouter: CategoryRouter;
    restaurantTypeRouter: RestaurantTypeRouter;
    phoneRouter: PhoneRouter;
    addressRouter: AddressRouter;
    restaurantRouter: RestaurantRouter;
    
    constructor(){
        this.router = express.Router();
        this.dishRouter = new DishRouter();
        this.categoryRouter = new CategoryRouter();
        this.restaurantTypeRouter = new RestaurantTypeRouter();
        this.phoneRouter= new PhoneRouter();
        this.addressRouter = new AddressRouter();
        this.restaurantRouter = new RestaurantRouter();
        this.setUpRoutes();
    }

    setUpRoutes(){
        this.router.use('/dish', this.dishRouter.getRouter());
        this.router.use('/category', this.categoryRouter.getRouter());
        this.router.use('/restaurant-type', this.restaurantTypeRouter.getRouter());
        this.router.use('/phone', this.phoneRouter.getRouter());
        this.router.use('/address', this.addressRouter.getRouter());
        this.router.use('/restaurant', authenticateRestaurant, this.restaurantRouter.getRouter());

    }

    getRouter(): any {
        return this.router;
    }
}