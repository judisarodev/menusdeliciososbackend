import AddressEntity from "../domain/addressEntity";
import AddressRepositoryImplementation from "../infraestructure/addressRepositoryImplementation";

export default class DeleteAddressUseCase {
    constructor(private addressRepositoryImplementation: AddressRepositoryImplementation){}

    async execute(addressId: number){
        await this.addressRepositoryImplementation.delete(addressId);
        return {
            response: { message: 'Dirección eliminado con éxito' },
            status: 200
        }
    }
}