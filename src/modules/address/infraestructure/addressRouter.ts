import { Router } from 'express';
import RouterPattern from "../../../domain/routerPattern";
import AddressRepositoryImplementation from './addressRepositoryImplementation';
import UpdateAddressUseCase from '../application/updateAddressUseCase';
import CreateAddressUseCase from '../application/createAddressUseCase';
import AddressEntity from '../domain/addressEntity';
import authorizeRestaurant from '../../../middlewares/authorizeRestaurantMiddleware';
import DeleteAddressUseCase from '../application/deleteAddressUseCase';

export default class AddressRouter implements RouterPattern {
    router: Router;
    addressRepositoryImplementation: AddressRepositoryImplementation;
    updateAddressUseCase: UpdateAddressUseCase;
    createAddressUseCase: CreateAddressUseCase;
    deleteAddressUseCase: DeleteAddressUseCase;
    
    constructor(){
        this.router = Router();
        this.addressRepositoryImplementation = new AddressRepositoryImplementation();
        this.updateAddressUseCase = new UpdateAddressUseCase(this.addressRepositoryImplementation);
        this.createAddressUseCase = new CreateAddressUseCase(this.addressRepositoryImplementation); 
        this.deleteAddressUseCase = new DeleteAddressUseCase(this.addressRepositoryImplementation);
        this.setUpRoutes();
    }

    setUpRoutes(): void {
        this.router.post('/create', authorizeRestaurant, async (req: any, res: any) => {
            try{
                const { address, addressDetails, restaurantId } = req.body;

                const addressEntity = new AddressEntity(address, addressDetails);
                await this.createAddressUseCase.execute(addressEntity, restaurantId);

                return res.status(200).json({ message: 'Dirección creada exitosamente' });
            }catch(error){
                console.error(error);
                return res.status(500).json(error);
            }
        });

        this.router.put('/update', authorizeRestaurant, async (req: any, res: any) => {
            try{
                const restaurantId = req.restaurantId;
                const data = req.body;
                const wasUpdated = await this.updateAddressUseCase.execute(data, restaurantId);
                return res.status(200).json({ success: wasUpdated }); 
            }catch(error){
                console.error(error);
                return res.status(500).json({ message: 'Hubo un error al actualizar la dirección' });
            }
        });

        this.router.delete('/delete/:addressId', authorizeRestaurant, async (req: any, res: any) => {
            try{
                const { addressId } = req.params;
                const { response, status } = await this.deleteAddressUseCase.execute(addressId);
                return res.status(status).json(response); 
            }catch(error){
                console.error(error);
                return res.status(500).json({ message: 'Hubo un error al eliminar la dirección' });
            }
        });
    }
    getRouter(): Router {
        return this.router; 
    }
    
}