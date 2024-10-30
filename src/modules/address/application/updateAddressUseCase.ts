import AddressEntity from "../domain/addressEntity";
import AddressRepositoryImplementation from "../infraestructure/addressRepositoryImplementation";


export default class UpdateAddressUseCase {
    constructor(private addressRepositoryImplementation: AddressRepositoryImplementation){}

    async execute(data: any[], restaurantId: number){
        let atLeastOneWasUpdated = false;

        for(const info of data){
            if(info.addressId){
                const addressEntity = new AddressEntity(info.address, info.details, info.addressId);
                const response = await this.addressRepositoryImplementation.update(addressEntity);
                if(response){
                    atLeastOneWasUpdated = true; 
                }
            }else {
                const addressEntity = new AddressEntity(info.address, info.details);
                await this.addressRepositoryImplementation.create(addressEntity, restaurantId);
                atLeastOneWasUpdated = true; 
            }
        }

        return atLeastOneWasUpdated; 
    }
}