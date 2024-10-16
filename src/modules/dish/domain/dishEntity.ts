import { CategoryEntity } from "../../category/domain/categoryEntity";
import ImageEntity from "../../image/domain/imageEntity";

export class DishEntity {
    dishId: number | undefined;
    category: CategoryEntity | undefined;
    name: string;
    price: number;
    description: string;
    image: ImageEntity | undefined;

    constructor(name: string, price: number, description: string, dishId?: number){
        this.name = name;
        this.price = price; 
        this.description = description;
        this.dishId = dishId;
    }

    setImage(i: ImageEntity | undefined){
        this.image = i;
    }

    getDishId(): number | undefined {
        return this.dishId;
    }

    getCategory(): CategoryEntity | undefined{
        return this.category;
    }

    getName(): string {
        return this.name;
    }

    getPrice(): number {
        return this.price; 
    }

    getDescription(): string {
        return this.description; 
    }

    setCategory(categoryEntity: CategoryEntity): void {
        this.category = categoryEntity;
    }

    getImage(): ImageEntity | undefined {
        return this.image;
    }
}