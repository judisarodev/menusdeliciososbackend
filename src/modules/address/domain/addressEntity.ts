import RestaurantEntity from "../../restaurant/domain/restaurantEntity";

export default class AddressEntity {
    private addressId: number | undefined;
    private address: string;
    private details: string | undefined;
    private restaurant: RestaurantEntity | undefined;

    constructor(address: string, details: string, addressId?: number){
        this.address = address;
        this.details = details;
        this.addressId = addressId;
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

    setRestaurant(restaurant: RestaurantEntity){
        this.restaurant = restaurant;
    }

    getRestaurant(): RestaurantEntity | undefined {
        return this.restaurant;
    }
}