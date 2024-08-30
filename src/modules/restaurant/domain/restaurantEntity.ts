import AddressEntity from "../../address/domain/addressEntity";
import PhoneEntity from "../../phone/domain/phoneEntity";
import RestaurantTypeEntity from "../../restaurant_type/domain/restaurantTypeEntity";

export default class RestaurantEntity {
    private restaurantId: number | undefined;
    private name: string;
    private email: string;
    private password: string;
    private logo: string;
    private phone: PhoneEntity | undefined; 
    private address: AddressEntity | undefined;
    private restaurantType: RestaurantTypeEntity | undefined;

    constructor(name: string, email: string, password: string, logo: string, restaurantId?: number){
        this.restaurantId = restaurantId;
        this.name = name; 
        this.email = email;
        this.password = password;
        this.logo = logo;
    }

    getRestaurantId(): number | undefined {
        return this.restaurantId;
    }

    getName(): string {
        return this.name; 
    }

    getEmail(): string {
        return this.email; 
    }

    getPassword(): string {
        return this.password;
    }

    getLogo(): string {
        return this.logo;
    }

    getPhone(): PhoneEntity | undefined {
        return this.phone;
    }

    getAddress(): AddressEntity | undefined {
        return this.address;
    }

    getRestaurantType(): RestaurantTypeEntity | undefined {
        return this.restaurantType; 
    }

    setPhone(phoneEntity: PhoneEntity): void {
        this.phone = phoneEntity;
    }

    setAddress(address: AddressEntity){
        this.address = address;
    }

    setRestaurantType(restaurantType: RestaurantTypeEntity){
        this.restaurantType = restaurantType; 
    }
}