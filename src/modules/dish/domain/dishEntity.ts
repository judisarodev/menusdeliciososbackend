import { CategoryEntity } from "../../category/domain/categoryEntity";

export class DishEntity {
    dishId: number | undefined;
    category: CategoryEntity | undefined;
    name: string;
    price: number;
    description: string;
    image: string;

    constructor(name: string, price: number, description: string, image: string, dishId?: number){
        this.name = name;
        this.price = price; 
        this.description = description;
        this.image = image;
        this.dishId = dishId;
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

    getImage(): string {
        return this.image; 
    }

    setCategory(categoryEntity: CategoryEntity): void {
        this.category = categoryEntity;
    }
}