import { CategoryEntity } from "../../category/domain/categoryEntity";
import PaletteEntity from "../../palette/domain/paletteEntity";
import RestaurantEntity from "../../restaurant/domain/restaurantEntity";

export default class ImageEntity {
    private imageId: number | undefined;
    private url: string;
    private restaurant: RestaurantEntity | undefined;

    constructor(url: string, imageId?: number){
        this.imageId = imageId;
        this.url = url;
    }

    getUrl(): string {
        return this.url;
    }

    setRestaurant(res: RestaurantEntity){
        this.restaurant = res;
    }

    getRestaurant(): RestaurantEntity | undefined{
        return this.restaurant;
    }
}