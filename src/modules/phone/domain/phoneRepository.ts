import PhoneEntity from "./phoneEntity";

export default interface PhoneRepository {
    create(phone: PhoneEntity): Promise<void>;
    update(data: any, phoneId: number): Promise<boolean>;
}