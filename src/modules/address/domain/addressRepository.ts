import AddressEntity from "./addressEntity";

export default interface AddressRepository {
    create(addressEntity: AddressEntity, transaction: any): Promise<number>;
    update(data: any, addressId: number): Promise<boolean>;
}