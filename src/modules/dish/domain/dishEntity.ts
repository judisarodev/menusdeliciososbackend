import { CategoryEntity } from "../../category/domain/categoryEntity";
import formatCurrency from './../../../utils/formatCurrency';
export class DishEntity {
    dishId: number | undefined;
    category: CategoryEntity | undefined;
    name: string;
    price: string;
    description: string;
    image: string;

    constructor(name: string, price: number, description: string, image: string, dishId?: number){
        this.name = name;
        this.price = formatCurrency(price); 
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

    getPrice(): string {
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