import { Router } from 'express';
import RouterPattern from "../../../domain/routerPattern";
import RestaurantRepositoryImplementation from './restaurantRepositoryImplementation';
import CreateRestaurantUseCase from '../application/createRestaurantUseCase';
import GetRestaurantByIdUseCase from '../application/getRestaurantByIdUseCase';
import AuthenticationPatternImplementation from '../../../infraestructure/authentication/authenticationPatternInplementation';
import authorizeRestaurant from '../../../middlewares/authorizeRestaurantMiddleware';
import AddressRepositoryImplementation from '../../address/infraestructure/addressRepositoryImplementation';

export default class RestaurantRouter implements RouterPattern {
    router: Router;
    restaurantRepositoryImplementation: RestaurantRepositoryImplementation;

    getRestaurantByIdUseCase: GetRestaurantByIdUseCase;
    createRestaurantUseCase: CreateRestaurantUseCase;
    authenticationPatternImplementation: AuthenticationPatternImplementation;
    addressRepositoryImplementation: AddressRepositoryImplementation;
    constructor() {
        this.router = Router();
        this.restaurantRepositoryImplementation = new RestaurantRepositoryImplementation();
        this.addressRepositoryImplementation = new AddressRepositoryImplementation();
        this.createRestaurantUseCase = new CreateRestaurantUseCase(
            this.restaurantRepositoryImplementation,
            this.addressRepositoryImplementation,
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
         *                logo:
         *                  type: string
         *                  example: "https://images.com/route-to-image"
         *                phoneInfo:
         *                  type: object
         *                  properties:
         *                    phoneNumber: 
         *                      type: string
         *                      example: "3158883333"
         *                    phoneCode:
         *                      type: object
         *                      properties:
         *                        code:
         *                          type: string
         *                          example: "+57"
         *                        country:
         *                          type: "string"
         *                          example: "Colombia"
         *                        phoneCodeId: 
         *                          type: number
         *                          example: 1
         *                addressInfo:
         *                  type: object
         *                  properties:
         *                    address:
         *                      type: string
         *                      example: "Carrera 100 no 10 - 1"
         *                    addressDetails: 
         *                      type: string
         *                      example: "Torre 2 apartamento 101"
         *                restaurantTypeInfo:
         *                  type: object
         *                  properties:
         *                    restaurantTypeName:
         *                      type: string
         *                      example: "Comida rápida"
         *                    restaurantTypeId: 
         *                      type: integer
         *                      example: 1
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
                const { name, email, password, phoneNumber, addresss, addressDetails, restaurantTypeId, countryId } = req.body;
                //await this.createRestaurantUseCase.execute(name, email, password, phoneNumber, addresss, addressDetails, restaurantTypeId, countryId);
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