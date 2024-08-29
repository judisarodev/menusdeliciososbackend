import PhoneRepositoryImplementation from "../infraestructure/phoneRepositoryImplementation";
export default class UpdatePhoneUseCase {
    constructor(private phoneRepositoryImplementation: PhoneRepositoryImplementation){}

    async execute(data: any, phoneId: number){
        return await this.phoneRepositoryImplementation.update(data, phoneId);
    }
}