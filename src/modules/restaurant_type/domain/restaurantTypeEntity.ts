export default class RestaurantTypeEntity {
    private restaurantTypeId: number | undefined;
    private name: string; 

    constructor(name: string, restaurantTypeId?: number){
        this.restaurantTypeId = restaurantTypeId; 
        this.name = name;
    }

    getRestaurantTypeId(): number | undefined {
        return this.restaurantTypeId; 
    }

    getName(): string {
        return this.name; 
    }
}