import AddressEntity from "../../address/domain/addressEntity";
import MenuEntity from "../../menu/domain/MenuEntity";
import RestaurantTypeEntity from "../../restaurant_type/domain/restaurantTypeEntity";

export default class RestaurantEntity {
    private restaurantId: number | undefined;
    private name: string;
    private email: string;
    private logo: string = '';
    private phoneNumber: string; 
    private menu: MenuEntity | undefined;
    private restaurantType: RestaurantTypeEntity | undefined;
    private addresses: AddressEntity[] = [];
    

    constructor(name: string, email: string, phoneNumber:string, restaurantId?: number){
        this.restaurantId = restaurantId;
        this.name = name; 
        this.email = email;
        this.phoneNumber = phoneNumber;
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

    getLogo(): string {
        return this.logo;
    }

    getPhone(): string{
        return this.phoneNumber;
    }

    getRestaurantType(): RestaurantTypeEntity | undefined {
        return this.restaurantType; 
    }

    setPhone(phoneNumber: string): void {
        this.phoneNumber = phoneNumber;
    }

    setRestaurantType(restaurantType: RestaurantTypeEntity){
        this.restaurantType = restaurantType; 
    }

    setAddresses(addresses: AddressEntity[]){
        this.addresses = addresses;
    }

    getAddresses(): AddressEntity[]{
        return this.addresses;
    }

    getMenu(): MenuEntity | undefined {
        return this.menu;
    }

}