import { DishEntity } from "./dishEntity";
import { CategoryEntity } from "../../category/domain/categoryEntity";

export interface DishRepository {
    create(dish: DishEntity, categoryId: number, imageId: number): void;
    delete(dishId: number): Promise<DishEntity>;
    update(dishId: number, data: any): Promise<boolean>;
    //get(dishId: number): Promise<DishEntity>;
}