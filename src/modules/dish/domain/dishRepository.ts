import { DishEntity } from "./dishEntity";

export interface DishRepository {
    getAll(restaurantId: number): Promise<DishEntity>;
    create(dish: DishEntity): void;
    delete(dishId: number): Promise<DishEntity>;
    update(dishId: number, data: any): Promise<DishEntity>;
}