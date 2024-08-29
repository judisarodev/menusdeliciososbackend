import RestaurantTypeEntity from "./restaurantTypeEntity";

export default interface RestaurantTypeRepository {
    getAll(): Promise<RestaurantTypeEntity[]>;
}