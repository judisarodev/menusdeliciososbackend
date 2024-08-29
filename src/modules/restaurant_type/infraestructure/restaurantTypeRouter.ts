import express, { Router } from 'express';
import RouterPattern from "../../../infraestructure/router/routerPattern";
import GetAllRestaurantTypesUseCase from '../application/getAllRestaurantTypesUseCase';
import RestaurantTypeRepositoryImplementation from './restaurantTypeRepositoryImplementation';

export default class RestaurantTypeRouter implements RouterPattern {
    router: Router;
    restaurantTypeRepositoryImplementation: RestaurantTypeRepositoryImplementation;
    getAllRestaurantTypesUseCase: GetAllRestaurantTypesUseCase;

    constructor(){
        this.router = express.Router();
        this.restaurantTypeRepositoryImplementation = new RestaurantTypeRepositoryImplementation();
        this.getAllRestaurantTypesUseCase = new GetAllRestaurantTypesUseCase(this.restaurantTypeRepositoryImplementation);

        this.setUpRoutes(); 
    }

    setUpRoutes(): void {
        this.router.get('/get-all', async (req: any, res: any) => {
            try{
                const restaurantTypes = await this.getAllRestaurantTypesUseCase.execute();
                return res.status(200).json(restaurantTypes); 
            }catch(error){
                console.error(error);
                return res.status(500).json(error);
            }
        });
    }
    getRouter(): Router {
        return this.router;
    }
    
}