import AddressEntity from "../domain/addressEntity";
import AddressRepositoryImplementation from "../infraestructure/addressRepositoryImplementation";

export default class CreateAddressUseCase {
    constructor(private addressRepositoryImplementation: AddressRepositoryImplementation){}

    async execute(phone: AddressEntity, restaurantId: number){
        this.addressRepositoryImplementation.create(phone, restaurantId);
    }
}