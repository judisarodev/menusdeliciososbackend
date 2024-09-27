import RestaurantEntity from "./restaurantEntity";

export default interface RestaurantRepository {
    create(restaurantEntity: RestaurantEntity, password: string): Promise<void>;
    getById(restaurantId: number): Promise<RestaurantEntity>;
    login(email: string, password: string): Promise<any>;
}