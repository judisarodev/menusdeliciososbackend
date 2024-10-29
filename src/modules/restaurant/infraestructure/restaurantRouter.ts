import { Router } from 'express';
import RouterPattern from "../../../domain/routerPattern";
import RestaurantRepositoryImplementation from './restaurantRepositoryImplementation';
import CreateRestaurantUseCase from '../application/createRestaurantUseCase';
import GetRestaurantByIdUseCase from '../application/getRestaurantByIdUseCase';
import AuthenticationPatternImplementation from '../../../infraestructure/authentication/authenticationPatternInplementation';
import authorizeRestaurant from '../../../middlewares/authorizeRestaurantMiddleware';
import AddressRepositoryImplementation from '../../address/infraestructure/addressRepositoryImplementation';
import MenuRepositoryImplementation from '../../menu/infraestructure/menuRepositoryImplementation';
import GetImagesUseCase from '../application/getImagesUseCase';
import UpdateRestaurantUseCase from '../application/updateRestaurantUseCase';

export default class RestaurantRouter implements RouterPattern {
    router: Router;
    restaurantRepositoryImplementation: RestaurantRepositoryImplementation;

    getRestaurantByIdUseCase: GetRestaurantByIdUseCase;
    createRestaurantUseCase: CreateRestaurantUseCase;
    authenticationPatternImplementation: AuthenticationPatternImplementation;
    addressRepositoryImplementation: AddressRepositoryImplementation;
    menuRepositoryImplementation: MenuRepositoryImplementation;
    getImagesUseCase: GetImagesUseCase;
    updateRestaurantUseCase: UpdateRestaurantUseCase;

    constructor() {
        this.router = Router();
        this.restaurantRepositoryImplementation = new RestaurantRepositoryImplementation();
        this.addressRepositoryImplementation = new AddressRepositoryImplementation();
        this.menuRepositoryImplementation = new MenuRepositoryImplementation();
        this.authenticationPatternImplementation = new AuthenticationPatternImplementation();
        this.createRestaurantUseCase = new CreateRestaurantUseCase(
            this.restaurantRepositoryImplementation,
            this.addressRepositoryImplementation,
            this.menuRepositoryImplementation,
            this.authenticationPatternImplementation,
        );
        this.getRestaurantByIdUseCase = new GetRestaurantByIdUseCase(this.restaurantRepositoryImplementation);
        this.getImagesUseCase = new GetImagesUseCase(this.restaurantRepositoryImplementation);
        this.updateRestaurantUseCase = new UpdateRestaurantUseCase(this.restaurantRepositoryImplementation);
        this.setUpRoutes();
    }

    setUpRoutes(): void {
        /**
         * @swagger
         * /api/restaurant/login:
         *   post:
         *     summary: User authentication
         *     tags:
         *          - Restaurant
         *     security:
         *          - BasicAuth: []
         *     responses:
         *          200:
         *              description: Successfull authentication
         *              content:
         *                  application/json:
         *                      schema: 
         *                          type: object
         *                          properties:
         *                              message:
         *                                  type: string
         *                                  description: "sucess"
         *                              jwt:
         *                                  type: string
         *                                  example: "Has iniciado sesión exitosamente"
         *          401:
         *              description: Incorrect credentials
         *              content:
         *                  application/json:
         *                      schema: 
         *                          type: object
         *                          properties:
         *                              message:
         *                                  type: string
         *                                  example: "Credenciales incorrectas"
         *          500: 
         *              description: Internal server error
         *              content:
         *                  application/json:
         *                      schema: 
         *                          type: object
         *                          properties:
         *                              message:
         *                                  type: string
         *                                  example: "Hubo un error al iniciar sesión"
        */
        this.router.post('/login', async (req: any, res: any) => {
            try {
                const authorizationHeaders = req.headers['authorization'];
                const token = authorizationHeaders.split(' ')[1];
                const credentials = Buffer.from(token, 'base64').toString('ascii');
                const [email, password] = credentials.split(':');
                const { isVerified, restaurantId } = await this.restaurantRepositoryImplementation.login(email, password);
                if (isVerified === true) {
                    const jwt = await this.authenticationPatternImplementation.signToken(restaurantId);
                    return res.status(200).json({ message: 'Has iniciado sesión exitosamente', jwt });
                }
                return res.status(401).json({ message: 'Credenciales incorrectas' });
            } catch (error) {
                console.error(error);
                return res.status(500).json({ message: 'Hubo un error al iniciar sesión' });
            }
        });

        /**
         * @swagger
         * /api/restaurant/create:
         *   post:
         *     summary: Create a restaurant account
         *     tags:
         *       - Restaurant
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *            schema:
         *              type: object
         *              properties:
         *                name:
         *                  type: string
         *                  example: "Pizza Arriba"
         *                email:
         *                  type: string
         *                  example: "pizza-arriba@mail.com"
         *                password:
         *                  type: string
         *                  example: "super-secure-password"
         *                phoneNumber: 
         *                  type: string
         *                  example: "3164449999"
         *                address: 
         *                  type: string
         *                  example: "Calle 100 no 30 - 10"
         *                addressDetails:
         *                  type: string
         *                  example: "Casa 23"
         *                countryId: 
         *                  type: number
         *                  example: 1
         *                restaurantTypeId: 
         *                  type: number
         *                  example: 1
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
         *                   example: "Restaurante creado exitosamente"
         *                 jwt:
         *                   type: string
         *                   example: "token-de-verificación"
         *       500:
         *         description: Internal server error
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 message:
         *                   type: string
         *                   example: "No fue posible crear el restaurante"
         *       400:
         *         description: Bad request
         *       409:
         *         description: Conflict
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 message:
         *                   type: string
         *                   example: "El correo ingresado ya está registrado"
         */
        this.router.post('/create', async (req: any, res: any) => {
            try {
                const { response, status } = await this.createRestaurantUseCase.execute(req.body);
                return res.status(status).json(response);
            } catch (error) {
                console.error(error);
                return res.status(500).json({ message: 'No fue posible crear el restaurante' });
            }
        });

        /**
         * @swagger
         * /api/restaurant/get:
         *   get:
         *      summary: Get a restaurant
         *      tags:
         *          - Restaurant
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
         *                              restaurantId:
         *                                  type: number
         *                                  example: 1
         *                              name:
         *                                  type: string
         *                                  example: "Pizza Arriba"
         *                              email:
         *                                   type: string
         *                                   example: "pizzaarriba@mail.com"
         *                              logo: 
         *                                   type: string
         *                                   example: "https:image.com/route-to-logo"
         *                              phone: 
         *                                    type: string
         *                                    example: "315 777 8888"
         *                              address: 
         *                                    type: string
         *                                    example: "Carrera 100 no 10 - 01"
         *                              restaurantType: 
         *                                     type: string
         *                                     example: "Comidas rápidas"    
         *          500: 
         *              description: Internal server error
         *              content:
         *                  application/json:
         *                      schema:
         *                          type: object
         *                          properties:
         *                              message:
         *                                  type: string
         *                                  example: "Ha ocurrido un error al consultar el restaurante"
         */
        this.router.get('/get', authorizeRestaurant, async (req: any, res: any) => {
            try {
                const restaurantId = req.restaurantId;
                const restaurant = await this.getRestaurantByIdUseCase.execute(restaurantId);
                return res.status(200).json(restaurant);
            } catch (error) {
                console.error(error);
                return res.status(500).json({ messaage: 'Ha ocurrido un error al consultar el restaurante' });
            }
        });

        this.router.get('/get-images', authorizeRestaurant, async (req: any, res: any) => {
            try {
                const restaurantId = req.restaurantId;
                const { response, status } = await this.getImagesUseCase.execute(restaurantId);
                return res.status(status).json(response);
            } catch (error) {
                console.error(error);
                return res.status(500).json({ messaage: 'Ha ocurrido un error al consultar las imágenes' });
            }
        });

        this.router.get('/get-background-images', authorizeRestaurant, async (req: any, res: any) => {
            try {
                const restaurantId = req.restaurantId;
                const { response, status } = await this.getImagesUseCase.execute(restaurantId, true);
                return res.status(status).json(response);
            } catch (error) {
                console.error(error);
                return res.status(500).json({ messaage: 'Ha ocurrido un error al consultar las imágenes' });
            }
        });

        this.router.put('/update', authorizeRestaurant, async (req: any, res: any) => {
            try{
                const restaurantId = req.restaurantId;
                const obj = req.body;
                const { response, status } = await this.updateRestaurantUseCase.execute(obj, restaurantId);
                return res.status(status).json(response);
            }catch(error){
                console.error(error);
                return res.status(500).json({ messaage: 'Ha ocurrido un error al actualizar el restaurante' });
            }
        });
    }
    getRouter(): Router {
        return this.router;
    }

}