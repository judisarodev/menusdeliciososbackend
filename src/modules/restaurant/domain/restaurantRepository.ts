import RestaurantEntity from "./restaurantEntity";

export default interface RestaurantRepository {
    create(restaurantEntity: RestaurantEntity, password: string, restaurantTypeId: number, countryId: number, menuId: number): Promise<number>;
    getById(restaurantId: number): Promise<RestaurantEntity>;
    login(email: string, password: string): Promise<any>;
    checkEmail(email: string): Promise<boolean>;
    getMenuId(restaurantId: number): Promise<number>;
    getImages(restaurantId: number): Promise<any>;
    getBackgroundImages(restaurantId: number): Promise<any>;
}