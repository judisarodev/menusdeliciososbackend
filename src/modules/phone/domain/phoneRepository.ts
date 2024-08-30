import PhoneEntity from "./phoneEntity";

export default interface PhoneRepository {
    create(phone: PhoneEntity, transaction: any): Promise<number>;
    update(data: any, phoneId: number): Promise<boolean>;
}