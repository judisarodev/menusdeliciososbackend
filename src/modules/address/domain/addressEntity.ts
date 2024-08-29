export default class AddressEntity {
    private addressId: number | undefined;
    private address: string;
    private addressDetails: string | undefined;

    constructor(address: string, addresDetails?: string, addressId?: number){
        this.address = address;
        this.addressDetails = addresDetails;
        this.addressId = addressId;
    }

    getAddressId(): number | undefined {
        return this.addressId;
    }

    getAddress(): string {
        return this.address;
    }

    getAddressDetails(): string | undefined{
        return this.addressDetails; 
    }
}