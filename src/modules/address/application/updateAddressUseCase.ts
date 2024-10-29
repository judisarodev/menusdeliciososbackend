import AddressEntity from "../domain/addressEntity";
import AddressRepositoryImplementation from "../infraestructure/addressRepositoryImplementation";


export default class UpdateAddressUseCase {
    constructor(private addressRepositoryImplementation: AddressRepositoryImplementation){}

    async execute(data: any[]){
        let atLeastOneWasUpdated = false;

        for(const info of data){
            const addressEntity = new AddressEntity(info.address, info.details, info.addressId);
            const response = await this.addressRepositoryImplementation.update(addressEntity);
            if(response){
                atLeastOneWasUpdated = true; 
            }
        }

        return atLeastOneWasUpdated; 
    }
}