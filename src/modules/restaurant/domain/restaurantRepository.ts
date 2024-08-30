import RestaurantEntity from "./restaurantEntity";

export default interface RestaurantRepository {
    create(restaurantEntity: RestaurantEntity, transaction: any): Promise<void>;
    getById(restaurantId: number): Promise<RestaurantEntity>;
    login(email: string, password: string): Promise<any>;
}