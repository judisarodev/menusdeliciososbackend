import { Router } from 'express';
import RouterPattern from "../../../domain/routerPattern";
import AddressRepositoryImplementation from './addressRepositoryImplementation';
import UpdateAddressUseCase from '../application/updateAddressUseCase';
import CreateAddressUseCase from '../application/createAddressUseCase';
import AddressEntity from '../domain/addressEntity';
import authenticateRestaurant from '../../../middlewares/authenticateRestaurantMiddleware';

export default class AddressRouter implements RouterPattern {
    router: Router;
    addressRepositoryImplementation: AddressRepositoryImplementation;
    updateAddressUseCase: UpdateAddressUseCase;
    createAddressUseCase: CreateAddressUseCase;
    
    constructor(){
        this.router = Router();
        this.addressRepositoryImplementation = new AddressRepositoryImplementation();
        this.updateAddressUseCase = new UpdateAddressUseCase(this.addressRepositoryImplementation);
        this.createAddressUseCase = new CreateAddressUseCase(this.addressRepositoryImplementation); 
        this.setUpRoutes();
    }

    setUpRoutes(): void {
        this.router.post('/create', authenticateRestaurant, async (req: any, res: any) => {
            try{
                const { address, addressDetails } = req.body;

                const addressEntity = new AddressEntity(address, addressDetails);
                await this.createAddressUseCase.execute(addressEntity);

                return res.status(200).json({ message: 'Dirección creada exitosamente' });
            }catch(error){
                console.error(error);
                return res.status(500).json(error);
            }
        });

        this.router.patch('/update', authenticateRestaurant, async (req: any, res: any) => {
            try{
                const { addressId, data } = req.body;
                const wasUpdated = await this.updateAddressUseCase.execute(data, addressId);
                return res.status(200).json({ success: wasUpdated }); 
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