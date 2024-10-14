import express, { Router } from 'express';
import RouterPattern from "../../../domain/routerPattern";
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
    /**
     * @swagger
     * /api/restaurant-type/get-all:
     *   get:
     *      summary: Get all countries
     *      tags:
     *          - Restaurant type
     *      responses:
     *          200:
     *              description: Sucess
     *              content:
     *                  application/json:
     *                      schema:
     *                          type: array
     *                          items:
     *                              type: object
     *                              properties:
     *                                  name:
     *                                      type: string
     *                                      example: "Panadería"
     *          500:
     *              description: Internal server error
     *              content:
     *                  application/json:
     *                      schema:
     *                          type: object
     *                          properties:
     *                              message:
     *                                  type: string
     *                                  example: "No ha sido posible consultar los tipos de restaurante"
     */
    setUpRoutes(): void {
        this.router.get('/get-all', async (req: any, res: any) => {
            try{
                const restaurantTypes = await this.getAllRestaurantTypesUseCase.execute();
                return res.status(200).json(restaurantTypes); 
            }catch(error){
                console.error(error);
                return res.status(500).json({ message: 'No ha sido posible consultar los tipos de restaurante' });
            }
        });
    }
    getRouter(): Router {
        return this.router;
    }
    
}