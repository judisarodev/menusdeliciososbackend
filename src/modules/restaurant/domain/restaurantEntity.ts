import AddressEntity from "../../address/domain/addressEntity";
import PhoneEntity from "../../phone/domain/phoneEntity";
import RestaurantTypeEntity from "../../restaurant_type/domain/restaurantTypeEntity";

export default class RestaurantEntity {
    private restaurantId: number | undefined;
    private name: string;
    private email: string;
    private password: string;
    private logo: string;
    private phone: PhoneEntity; 
    private address: AddressEntity;
    private restaurantType: RestaurantTypeEntity;

    constructor(name: string, email: string, password: string, logo: string, phone: PhoneEntity, address: AddressEntity, restaurantType: RestaurantTypeEntity, restaurantId?: number){
        this.restaurantId = restaurantId;
        this.name = name; 
        this.email = email;
        this.password = password;
        this.logo = logo;
        this.phone = phone; 
        this.address = address;
        this.restaurantType = restaurantType; 
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

    getPhone(): PhoneEntity {
        return this.phone;
    }

    getAddress(): AddressEntity {
        return this.address;
    }

    getRestaurantType(): RestaurantTypeEntity {
        return this.restaurantType; 
    }
}