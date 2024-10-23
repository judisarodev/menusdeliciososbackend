import express from 'express';
import DishRouter from '../../modules/dish/infraestructure/dishRouter';
import CategoryRouter from '../../modules/category/infraestructure/categoryRouter';
import RouterPattern from '../../domain/routerPattern';
import RestaurantTypeRouter from '../../modules/restaurant_type/infraestructure/restaurantTypeRouter';
import AddressRouter from '../../modules/address/infraestructure/addressRouter';
import CountryRouter from '../../modules/country/infraestructure/countryRouter';
import RestaurantRouter from '../../modules/restaurant/infraestructure/restaurantRouter';
import MenuRouter from '../../modules/menu/infraestructure/menuRouter';
import ClientRouter from '../../modules/client/infraestructure/clientRouter';
import SurveyRouter from '../../modules/survey/infraestructure/surveyRouter';

export default class Router implements RouterPattern{
    router: any;
    dishRouter: DishRouter;
    categoryRouter: CategoryRouter;
    restaurantTypeRouter: RestaurantTypeRouter;
    addressRouter: AddressRouter;
    restaurantRouter: RestaurantRouter;
    countryRouter: CountryRouter;
    menuRouter: MenuRouter;
    clientRouter: ClientRouter;
    surveyRouter: SurveyRouter;
    
    constructor(){
        this.router = express.Router();
        this.dishRouter = new DishRouter();
        this.categoryRouter = new CategoryRouter();
        this.restaurantTypeRouter = new RestaurantTypeRouter();
        this.addressRouter = new AddressRouter();
        this.restaurantRouter = new RestaurantRouter();
        this.countryRouter = new CountryRouter();
        this.menuRouter = new MenuRouter();
        this.clientRouter = new ClientRouter();
        this.surveyRouter = new SurveyRouter();

        this.setUpRoutes();
    }

    setUpRoutes(){
        this.router.use('/dish', this.dishRouter.getRouter());
        this.router.use('/category', this.categoryRouter.getRouter());
        this.router.use('/restaurant-type', this.restaurantTypeRouter.getRouter());
        this.router.use('/address', this.addressRouter.getRouter());
        this.router.use('/restaurant', this.restaurantRouter.getRouter());
        this.router.use('/country', this.countryRouter.getRouter());
        this.router.use('/menu', this.menuRouter.getRouter());
        this.router.use('/client', this.clientRouter.getRouter());
        this.router.use('/survey', this.surveyRouter.getRouter());
        this.router.use('/get-image', express.static('images/products'));
    }

    getRouter(): any {
        return this.router;
    }
}