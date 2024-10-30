import AddressEntity from "./addressEntity";

export default interface AddressRepository {
    create(addressEntity: AddressEntity, transaction: any): Promise<number>;
    update(data: AddressEntity): Promise<boolean>;
    delete(addressId: number): Promise<void>;
}