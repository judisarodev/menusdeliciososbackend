import express, { Router } from 'express';
import { DishRepositoryImplementation } from './dishRepositoryImplementation';
import CreateDishUseCase from '../application/createDishUseCase';
import UpdateDishUseCase from '../application/updateDishUseCase';
import DeleteDishUseCase from '../application/deleteDishUseCase';
import CategoryRepositoryImplementation from '../../category/infraestructure/categoryRepositoryImplementation';
import GetCategoryByIdUseCase from '../../category/application/getCategoryByIdUseCase';
import { DishEntity } from '../domain/dishEntity';
import RouterPattern from '../../../domain/routerPattern';
import authorizeRestaurant from '../../../middlewares/authorizeRestaurantMiddleware';
import GetDishUseCase from '../application/getDishUseCase';

export default class DishRouter implements RouterPattern {
    router: Router;
    createDishUseCase: CreateDishUseCase;
    updateDishUseCase: UpdateDishUseCase;
    deleteDishUseCase: DeleteDishUseCase;
    dishRepositoryImplementation: DishRepositoryImplementation;
    getCategoryByIdUseCase: GetCategoryByIdUseCase;
    categoryRepositoryImplementation: CategoryRepositoryImplementation;
    getDishUseCase: GetDishUseCase;
    
    constructor(){
        this.router = express.Router();
        this.dishRepositoryImplementation = new DishRepositoryImplementation();
        this.createDishUseCase = new CreateDishUseCase(this.dishRepositoryImplementation);
        this.updateDishUseCase = new UpdateDishUseCase(this.dishRepositoryImplementation);
        this.deleteDishUseCase = new DeleteDishUseCase(this.dishRepositoryImplementation);

        this.categoryRepositoryImplementation = new CategoryRepositoryImplementation();
        this.getCategoryByIdUseCase = new GetCategoryByIdUseCase(this.categoryRepositoryImplementation);

        this.getDishUseCase = new GetDishUseCase(this.dishRepositoryImplementation);

        this.setUpRoutes();
    }

    setUpRoutes(){
        /**
         * @swagger
         * /api/get/{dishId}:
         *   post:
         *     summary: User authentication
         *     tags:
         *          - Dish
         *     security:
         *          - BasicAuth: []
         *     parameters:
         *          - in: path  
         *            name: dishId
         *            schema:
         *              type: integer
         *            required: true
         *            description: Dish ID
         *     responses:
         *          200:
         *              description: Success
         *              content:
         *                  application/json:
         *                      schema: 
         *                          type: object
         *                          properties:
         *                              name:
         *                                  type: string
         *                                  example: "Pizza doble"
         *                              price:
         *                                  type: number
         *                                  example: 32000
         *                              description:
         *                                  type: string
         *                                  example: "Deliciosa pizza doble"
         *                              image: 
         *                                  type: string
         *                                  example: "https://image.com/route-to-image"
         *                              category:
         *                                  type: string
         *                                  example: "Pizzas"
         *          500: 
         *              description: Internal server error
         *              content:
         *                  application/json:
         *                      schema: 
         *                          type: object
         *                          properties:
         *                              message:
         *                                  type: string
         *                                  example: "Hubo un error al concultar el plato"
        */
        /*this.router.get('/get/:dishId', authorizeRestaurant, async (req: any, res: any) => {
            try{
                const { dishId } = req.params;
                const dish = await this.getDishUseCase.execute(dishId);
                return res.status(200).json({
                    name: dish.getName(),
                    price: dish.getPrice(),
                    description: dish.getDescription(),                
                    image: dish.getImage(),
                    category: dish.getCategory()?.getName(),
                });
            }catch(error){
                console.error(error);
                return res.status(200).json({ message: 'Hubo un error al concultar el plato' });
            }
        });*/

        /**
         * @swagger
         * /api/dish/create:
         *   post:
         *     summary: Create a dish
         *     tags:
         *       - Dish
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               name:
         *                 type: string
         *                 example: "Pizza doble"
         *               price:
         *                 type: number
         *                 example: 32000
         *               description:
         *                 type: string
         *                 example: "Deliciosa pizza doble"
         *               image: 
         *                 type: string
         *                 example: "https://image.com/route-to-image"
         *               categoryId:
         *                 type: integer
         *                 example: 1
         *     security:
         *       - BearerAuth: []
         *     responses:
         *       201:
         *         description: Success
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 message:
         *                   type: string
         *                   example: "Plato creado exitosamente"
         *       500:
         *         description: Internal server error
         *         content:
         *           application/json:
         *             schema: 
         *               type: object
         *               properties:
         *                 message:
         *                   type: string
         *                   example: "No fue posible crear el plato"
         */
        this.router.post('/create', authorizeRestaurant, async (req: any, res: any) => {
            try{ 
                const { categoryId, name, price, description, imageId } = req.body;
                const dishEntity = new DishEntity(name, price, description);
                await this.createDishUseCase.execute(dishEntity, categoryId, imageId);
                return res.status(200).json({ message: 'Plato creado con éxito' });
            }catch(error){
                console.error(error);
                return res.status(500).json({ message: 'No fue posible crear el plato' });
            }
        });

        this.router.put('/update', authorizeRestaurant, async (req: any, res: any) => {
            try{
                const { dishId, data } = req.body;
                await this.updateDishUseCase.execute(dishId, data);
                return res.status(200).json({ message: 'Producto actualizado' });
            }catch(error){
                console.error(error);
                return res.status(200).json(error);
            }
        });

        this.router.delete('/delete', async (req: any, res: any) => {
            try{
                const { dishId } = req.body;
                const deletedDish = await this.deleteDishUseCase.execute(dishId);
                return res.status(200).json({ message: 'El plato ha sido eliminado', deletedDish });
            }catch(error){
                console.error(error);
                return res.status(200).json(error); 
            }
        });
    }

    getRouter(): Router {
        return this.router;
    }
}