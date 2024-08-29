import SequelizeSetUp from "../../../infraestructure/config/sequelize";
import PhoneEntity from "../domain/phoneEntity";
import PhoneRepository from "../domain/phoneRepository";

export default class PhoneRepositoryImplementation implements PhoneRepository{
    private models: any;

    constructor(){
        this.models = SequelizeSetUp.getModels();
    }

    async create(phone: PhoneEntity) {
        await this.models.Phone.create({
            phoneNumber: phone.getPhoneNumber(),
            phoneCodeId: phone.getPhoneCode().getPhoneCodeId(),
        });
    }
    async update(data: any, phoneId: number): Promise<boolean> {
        const [wasUpdated] = await this.models.Phone.update(data, { where: { phoneId } });
        return wasUpdated; 
    }

}