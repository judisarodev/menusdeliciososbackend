import RestaurantEntity from "../../restaurant/domain/restaurantEntity";

export default class AddressEntity {
    private addressId: number | undefined;
    private address: string;
    private details: string | undefined;
    private restaurant: RestaurantEntity;

    constructor(address: string, details: string, restaurant: RestaurantEntity, addressId?: number){
        this.address = address;
        this.details = details;
        this.addressId = addressId;
        this.restaurant = restaurant; 
    }

    getAddressId(): number | undefined {
        return this.addressId;
    }

    getAddress(): string {
        return this.address;
    }

    getAddressDetails(): string | undefined{
        return this.details; 
    }

    setAddressId(addressId: number): void {
        this.addressId = addressId;
    }
}