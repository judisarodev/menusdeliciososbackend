import { Router } from 'express';
import RouterPattern from "../../../domain/routerPattern";
import RestaurantRepositoryImplementation from './restaurantRepositoryImplementation';
import CreateRestaurantUseCase from '../application/createRestaurantUseCase';
import GetRestaurantByIdUseCase from '../application/getRestaurantByIdUseCase';
import RestaurantEntity from '../domain/restaurantEntity';
import PhoneEntity from '../../phone/domain/phoneEntity';
import AddressEntity from '../../address/domain/addressEntity';
import RestaurantTypeEntity from '../../restaurant_type/domain/restaurantTypeEntity';
import AuthenticationPatternImplementation from '../../../infraestructure/authentication/authenticationPatternInplementation';
import authenticateRestaurant from '../../../middlewares/authenticateRestaurantMiddleware';
import SequelizeSetUp from '../../../infraestructure/config/sequelize';
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
    constructor(){
        this.router = Router();
        this.restaurantRepositoryImplementation = new RestaurantRepositoryImplementation();
        this.addressRepositoryImplementation = new AddressRepositoryImplementation();
        this.phoneRepositoryImplementation= new PhoneRepositoryImplementation();
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
        this.router.post('/login', async (req: any, res: any) => {
            const { email, password } = req.body;
            const { isVerified, restaurantId } = await this.restaurantRepositoryImplementation.login(email, password);
            if(isVerified){
                const jwt = await this.authenticationPatternImplementation.signToken(restaurantId);
                return res.status(200).json({ isVerified, jwt });
            }
            return res.status(401).json({ isVerified });
        });
        
        this.router.post('/create', async (req: any, res: any) => {
            const transaction = SequelizeSetUp.getSequelize().transaction();
            try{
                const { name, email, password, logo, phoneInfo, addressInfo, restaurantTypeInfo } = req.body;
                const restaurantEntity = new RestaurantEntity(name, email, password, logo);
                await this.createRestaurantUseCase.execute(restaurantEntity, phoneInfo, addressInfo, restaurantTypeInfo, transaction);

                await transaction.commit();

                return res.status(200).json({ message: 'Restaurante creado exitosamente' });
            }catch(error){
                console.error(error);
                await transaction.rollback();
                return res.status(500).json(error);
            }
        });

        this.router.get('/get', authenticateRestaurant, async (req: any, res: any) => {
            try{
                const restaurantId = req.restaurantId;
                const restaurantEntity = await this.getRestaurantByIdUseCase.execute(restaurantId); 
                return res.status(200).json(restaurantEntity); 
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