import { DishEntity } from "./dishEntity";

export interface DishRepository {
    getAll(): Promise<DishEntity>;
    create(dish: DishEntity): DishEntity;
    delete(dishId: number): DishEntity;
}