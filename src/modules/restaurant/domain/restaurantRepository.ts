import RestaurantEntity from "./restaurantEntity";

export default interface RestaurantRepository {
    create(restaurantEntity: RestaurantEntity): Promise<void>;
    getById(restaurantId: number): Promise<RestaurantEntity>;
}