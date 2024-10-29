import SequelizeSetUp from "../../../infraestructure/config/sequelize";
import AddressEntity from "../domain/addressEntity";
import AddressRepository from "../domain/addressRepository";

export default class AddressRepositoryImplementation implements AddressRepository{
    private models: any;

    constructor(){
        this.models = SequelizeSetUp.getModels();
    }

    async create(address: AddressEntity, restaurantId: number) {
        try{
            const createdAddress = await this.models.Address.create({
                address: address.getAddress(),
                addressDetails: address.getAddressDetails(),
                restaurantId,
            });
            const addressId = createdAddress.addressId; 
            return addressId;
        }catch(error){
            console.error(error);
            throw error;
        }
        
    }
    async update(addressEntity: AddressEntity): Promise<boolean> {
        const [wasUpdated] = await this.models.Address.update({
            address: addressEntity.getAddress(),
            details: addressEntity.getAddressDetails(),
        }, { where: { addressId: addressEntity.getAddressId() } });
        return wasUpdated; 
    }
}