import { DishEntity } from "../../dish/domain/dishEntity";
import MenuEntity from "../../menu/domain/MenuEntity";

export class CategoryEntity {
    private categoryId: number | undefined;
    private name: string;
    private icon: string;
    private dishes: DishEntity[] | undefined;
   
    constructor(name: string, icon: string, categoryId?: number){
        this.categoryId = categoryId;
        this.name = name;
        this.icon = icon; 
    }

    getDishes(): DishEntity[] | undefined {
        return this.dishes;
    }

    setDishes(dishes: DishEntity[]){
        return this.dishes = dishes;
    }

    getCategoryId(): number | undefined {
        return this.categoryId;
    }

    getName(): string {
        return this.name; 
    }

    getIcon(): string {
        return this.icon; 
    }
}