import { CategoryEntity } from "../../category/domain/categoryEntity";

export class DishEntity {
    dishId: number | undefined;
    category: CategoryEntity;
    name: string;
    price: number;
    description: string;
    image: string;

    constructor(category: CategoryEntity, name: string, price: number, description: string, image: string, dishId?: number){
        this.category = category;
        this.name = name;
        this.price = price; 
        this.description = description;
        this.image = image;
        this.dishId = dishId;
    }
}