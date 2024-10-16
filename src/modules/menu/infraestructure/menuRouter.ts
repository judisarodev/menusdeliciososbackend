import { Router } from 'express';
import RouterPattern from "../../../domain/routerPattern";
import authorizeRestaurant from '../../../middlewares/authorizeRestaurantMiddleware';
import MenuRepositoryImplementation from '../../menu/infraestructure/menuRepositoryImplementation';
import GetMenuUseCase from '../application/getMenuUseCase';
import GetPalettesUseCase from '../application/getPalettesUseCase';

export default class MenuRouter implements RouterPattern {
    router: Router;
    menuRepositoryImplementation: MenuRepositoryImplementation;
    getMenuUseCase: GetMenuUseCase;
    getPalettesUseCase: GetPalettesUseCase;

    constructor() {
        this.router = Router();
        this.menuRepositoryImplementation = new MenuRepositoryImplementation();
        this.getMenuUseCase = new GetMenuUseCase(this.menuRepositoryImplementation);
        this.getPalettesUseCase = new GetPalettesUseCase(this.menuRepositoryImplementation);
        this.setUpRoutes();
    }

    setUpRoutes(): void {
        /**
         * @swagger
         * /api/menu/get:
         *   get:
         *      summary: Get a menu
         *      tags:
         *          - Menu
         *      parameters:
         *          - name: menuId
         *            in: path
         *            required: true
         *            description: ID del menú
         *            schema:
         *                type: integer
         *      security:
         *          - BearerAuth: []
         *      responses:
         *          200:
         *              description: Succeess
         *              content:
         *                  application/json:
         *                      schema:
         *                          type: object
         *                          properties: 
         *                              showDescription:
         *                                  type: boolean
         *                                  example: true
         *                              showNavigation:
         *                                  type: boolean
         *                                  example: true
         *                              showIcons:
         *                                   type: boolean
         *                                   example: true
         *                              layout: 
         *                                   type: string
         *                                   example: "linear"
         *                              font: 
         *                                    type: string
         *                                    example: "sans-serif"
         *                              menuId: 
         *                                    type: number
         *                                    example: 1
         *                              url: 
         *                                     type: string
         *                                     example: "/name-date"    
         *                              categories:
         *                                     type: array
         *                                     items:
         *                                            type: object
         *                                            properties: 
         *                                                   categoryId:
         *                                                          type: integer
         *                                                          example: 1
         *                                                   name:
         *                                                          type: string
         *                                                          example: "Hamburguesas"
         *                                                   icon:
         *                                                          type: string
         *                                                          example: "pi pi-check"
         *                                                   products:
         *                                                          type: array
         *                                                          items: 
         *                                                                 type: object
         *                                                                 properties: 
         *                                                                        productId:
         *                                                                               type: integer
         *                                                                               example: 1
         *                                                                        name:
         *                                                                               type: string
         *                                                                               example: "Pizza Vegetariana"
         *                                                                        price:
         *                                                                               type: number
         *                                                                               example: 10000
         *                                                                        description:
         *                                                                               type: string
         *                                                                               example: "Deliciosa pizza sin carnes"
         *                                                                        image:
         *                                                                               type: string
         *                                                                               example: "url-route-to-image"
         *          500: 
         *              description: Internal server error
         *              content:
         *                  application/json:
         *                      schema:
         *                          type: object
         *                          properties:
         *                              message:
         *                                  type: string
         *                                  example: "Ha ocurrido un error al consultar el menú"
         */
        this.router.get('/get/:menuId', authorizeRestaurant, async (req: any, res: any) => {
            try {
                const { menuId } = req.params;
                const { response, status } = await this.getMenuUseCase.execute(menuId);
                return res.status(status).json(response);
            } catch (error) {
                console.error(error);
                return res.status(500).json({ messaage: 'Ha ocurrido un error al consultar el menú' });
            }
        });

        this.router.get('/get-palettes', async (req: any, res: any) => {
            try {
                const { response, status } = await this.getPalettesUseCase.execute();
                return res.status(status).json(response);
            } catch (error) {
                console.error(error);
                return res.status(500).json({ messaage: 'Ha ocurrido un error al consultar las paletas' });
            }
        });
    }
    getRouter(): Router {
        return this.router;
    }

}