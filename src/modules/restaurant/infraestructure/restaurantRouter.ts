import { Router } from 'express';
import RouterPattern from "../../../infraestructure/router/routerPattern";
import RestaurantRepositoryImplementation from './restaurantRepositoryImplementation';
import CreateRestaurantUseCase from '../application/createRestaurantUseCase';
import GetRestaurantByIdUseCase from '../application/getRestaurantByIdUseCase';
import RestaurantEntity from '../domain/restaurantEntity';
import PhoneEntity from '../../phone/domain/phoneEntity';
import AddressEntity from '../../address/domain/addressEntity';
import RestaurantTypeEntity from '../../restaurant_type/domain/restaurantTypeEntity';

export default class RestaurantRouter implements RouterPattern {
    router: Router;
    restaurantRepositoryImplementation: RestaurantRepositoryImplementation;
    
    getRestaurantByIdUseCase: GetRestaurantByIdUseCase;
    createRestaurantUseCase: CreateRestaurantUseCase;
    constructor(){
        this.router = Router();
        this.restaurantRepositoryImplementation = new RestaurantRepositoryImplementation();
        this.createRestaurantUseCase = new CreateRestaurantUseCase(this.restaurantRepositoryImplementation);
        this.getRestaurantByIdUseCase = new GetRestaurantByIdUseCase(this.restaurantRepositoryImplementation); 
        
        this.setUpRoutes();
    }

    setUpRoutes(): void {
        this.router.post('/create', async (req: any, res: any) => {
            try{
                const { name, email, password, logo, phoneInfo, addressInfo, restaurantType } = req.body;

                const { phoneNumber, poneCode, phoneId } = phoneInfo;
                const phoneEntity = new PhoneEntity(phoneNumber, poneCode, phoneId);

                const { address, addressDetails, addressId } = addressInfo;
                const addressEntity = new AddressEntity(address, addressDetails, addressId);

                const { restaurantTypeName, restaurantTypeId } = restaurantType;
                const restaurantTypeEntity = new RestaurantTypeEntity(restaurantTypeName, restaurantTypeId);

                const restaurantEntity = new RestaurantEntity(name, email, password, logo, phoneEntity, addressEntity, restaurantTypeEntity);
                await this.createRestaurantUseCase.execute(restaurantEntity);

                return res.status(200).json({ message: 'Restaurante creado exitosamente' });
            }catch(error){
                console.error(error);
                return res.status(500).json(error);
            }
        });

        this.router.get('/get-by-id/:restaurantId', async (req: any, res: any) => {
            try{
                const { restaurantId } = req.params;
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