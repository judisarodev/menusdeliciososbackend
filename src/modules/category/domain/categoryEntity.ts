import RestaurantEntity from "../../restaurant/domain/restaurantEntity";

export class CategoryEntity {
    private categoryId: number | undefined;
    private name: string;
    private image: string;
    private icon: string;
    private restaurant: RestaurantEntity | undefined;
   
    constructor(name: string, image: string, icon: string, categoryId?: number){
        this.categoryId = categoryId;
        this.name = name;
        this.image = image;
        this.icon = icon;
    }

    getCategoryId(): number | undefined {
        return this.categoryId;
    }

    getName(): string {
        return this.name; 
    }

    getImage(): string {
        return this.image; 
    }

    getIcon(): string {
        return this.icon; 
    }

    getRestaurant(): RestaurantEntity | undefined {
        return this.restaurant;
    }

    setRestaurant(restaurant: RestaurantEntity): void {
        this.restaurant = restaurant;
    }
}