import { Router } from 'express';
import RouterPattern from "../../../domain/routerPattern";
import RestaurantRepositoryImplementation from './restaurantRepositoryImplementation';
import CreateRestaurantUseCase from '../application/createRestaurantUseCase';
import GetRestaurantByIdUseCase from '../application/getRestaurantByIdUseCase';
import RestaurantEntity from '../domain/restaurantEntity';
import AuthenticationPatternImplementation from '../../../infraestructure/authentication/authenticationPatternInplementation';
import authorizeRestaurant from '../../../middlewares/authorizeRestaurantMiddleware';
import AddressRepositoryImplementation from '../../address/infraestructure/addressRepositoryImplementation';
import PhoneRepositoryImplementation from '../../phone/infraestructure/phoneRepositoryImplementation';

export default class RestaurantRouter implements RouterPattern {
    router: Router;
    restaurantRepositoryImplementation: RestaurantRepositoryImplementation;

    getRestaurantByIdUseCase: GetRestaurantByIdUseCase;
    createRestaurantUseCase: CreateRestaurantUseCase;
    authenticationPatternImplementation: AuthenticationPatternImplementation;
    addressRepositoryImplementation: AddressRepositoryImplementation;
    phoneRepositoryImplementation: PhoneRepositoryImplementation;
    constructor() {
        this.router = Router();
        this.restaurantRepositoryImplementation = new RestaurantRepositoryImplementation();
        this.addressRepositoryImplementation = new AddressRepositoryImplementation();
        this.phoneRepositoryImplementation = new PhoneRepositoryImplementation();
        this.createRestaurantUseCase = new CreateRestaurantUseCase(
            this.restaurantRepositoryImplementation,
            this.addressRepositoryImplementation,
            this.phoneRepositoryImplementation
        );
        this.getRestaurantByIdUseCase = new GetRestaurantByIdUseCase(this.restaurantRepositoryImplementation);
        this.authenticationPatternImplementation = new AuthenticationPatternImplementation();
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
         *              description: Sucessfull authentication
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
         *       500:
         *         description: Internal server error
         */
        this.router.post('/create', async (req: any, res: any) => {
            try {
                const { name, email, password, logo, phoneInfo, addressInfo, restaurantTypeInfo } = req.body;
                const restaurantEntity = new RestaurantEntity(name, email, logo);
                await this.createRestaurantUseCase.execute(restaurantEntity, phoneInfo, addressInfo, restaurantTypeInfo, password);
                return res.status(201).json({ message: 'Restaurante creado exitosamente.' });
            } catch (error) {
                console.error(error);
                return res.status(500).json(error);
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
                return res.status(200).json({
                    restaurantId: restaurant.getRestaurantId(),
                    name: restaurant.getName(),
                    email: restaurant.getEmail(),
                    logo: restaurant.getLogo(),
                    phone: `${restaurant.getPhone()?.getPhoneCode().getCode()} ${restaurant.getPhone()?.getPhoneNumber()}`,
                    address: `${restaurant.getAddress()?.getAddress()} - ${restaurant.getAddress()?.getAddressDetails()}`,
                    restaurantType: restaurant.getRestaurantType()?.getName(),
                });
            } catch (error) {
                console.error(error);
                return res.status(500).json({ messaage: 'Ha ocurrido un error al consultar el restaurante' });
            }
        });
    }
    getRouter(): Router {
        return this.router;
    }

}