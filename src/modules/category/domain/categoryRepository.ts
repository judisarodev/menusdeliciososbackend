import { CategoryEntity } from "./categoryEntity";

export interface CategoryRepository {
    getById(categoryId: number, restaurantId: number): Promise<CategoryEntity>;
    create(categoryEntity: CategoryEntity, menuId: number): Promise<void>;
}