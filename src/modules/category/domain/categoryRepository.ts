import { CategoryEntity } from "./categoryEntity";

export interface CategoryRepository {
    getById(categoryId: number, restaurantId: number): Promise<CategoryEntity>;
    getAll(): Promise<CategoryEntity[]>;
    create(categoryEntity: CategoryEntity): void;
}