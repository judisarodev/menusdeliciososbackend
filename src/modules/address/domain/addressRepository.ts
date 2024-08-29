import AddressEntity from "./addressEntity";

export default interface AddressRepository {
    create(addressEntity: AddressEntity): Promise<void>;
    update(data: any, addressId: number): Promise<boolean>;
}