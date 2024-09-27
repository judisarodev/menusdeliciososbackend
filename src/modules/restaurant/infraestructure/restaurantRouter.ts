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
         *     description: It returns a JWT for further API usage.
         *     tags:
         *          - Restaurant
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
         *          401:
         *              description: Incorrect credentials
         *              content:
         *                  application/json:
         *                      schema: 
         *                          type: object
         *                          properties:
         *                              message:
         *                                  type: string
         *          500: 
         *              description: Internal server error
         *              content:
         *                  application/json:
         *                      schema: 
         *                          type: object
         *                          properties:
         *                              message:
         *                                  type: string
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
                return res.status(401).json({ message: 'Credenciales incorrectas'});
            } catch (error) {
                console.error(error);
                return res.status(500).json({ message: 'Hubo un error al iniciar sesión'});
            }
        });

        this.router.post('/create', async (req: any, res: any) => {
            try {
                const { name, email, password, logo, phoneInfo, addressInfo, restaurantTypeInfo } = req.body;
                const restaurantEntity = new RestaurantEntity(name, email, password, logo);
                await this.createRestaurantUseCase.execute(restaurantEntity, phoneInfo, addressInfo, restaurantTypeInfo);
                return res.status(200).json({ message: 'Restaurante creado exitosamente' });
            } catch (error) {
                console.error(error);
                return res.status(500).json(error);
            }
        });

        this.router.get('/get', authorizeRestaurant, async (req: any, res: any) => {
            try {
                const restaurantId = req.restaurantId;
                const restaurantEntity = await this.getRestaurantByIdUseCase.execute(restaurantId);
                return res.status(200).json(restaurantEntity);
            } catch (error) {
                console.error(error);
                return res.status(500).json(error);
            }
        });
    }
    getRouter(): Router {
        return this.router;
    }

}