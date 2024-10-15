import { CategoryEntity } from "./categoryEntity";

export interface CategoryRepository {
    getById(categoryId: number, restaurantId: number): Promise<CategoryEntity>;
    create(categoryEntity: CategoryEntity, menuId: number): Promise<void>;
    delete(categoryId: number): Promise<void>;
    update(name: string, icon: string, categoryId: number): Promise<void>;
}