import { CategoryEntity } from "./categoryEntity";

export interface CategoryRepository {
    getById(categoryId: number, restaurantId: number): Promise<CategoryEntity>;
    getAll(menuId: number): Promise<CategoryEntity[]>;
    create(categoryEntity: CategoryEntity): void;
    updateImage(categoryId: number, image: string): Promise<void>;
}