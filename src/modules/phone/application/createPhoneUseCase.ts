import PhoneEntity from "../domain/phoneEntity";
import PhoneRepositoryImplementation from "../infraestructure/phoneRepositoryImplementation";
export default class CreatePhoneUseCase {
    constructor(private phoneRepositoryImplementation: PhoneRepositoryImplementation){}

    async execute(phone: PhoneEntity){
        this.phoneRepositoryImplementation.create(phone);
    }
}