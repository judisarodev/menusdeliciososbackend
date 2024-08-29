import AddressRepositoryImplementation from "../infraestructure/addressRepositoryImplementation";


export default class UpdateAddressUseCase {
    constructor(private addressRepositoryImplementation: AddressRepositoryImplementation){}

    async execute(data: any, addressId: number){
        return await this.addressRepositoryImplementation.update(data, addressId);
    }
}