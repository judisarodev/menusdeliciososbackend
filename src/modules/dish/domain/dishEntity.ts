import { CategoryEntity } from "../../category/domain/categoryEntity";

export class DishEntity {
    category: CategoryEntity;
    name: string;
    price: number;
    description: string;
    image: string;

    constructor(category: CategoryEntity, name: string, price: number, description: string, image: string){
        this.category = category;
        this.name = name;
        this.price = price; 
        this.description = description;
        this.image = image;
    }
}