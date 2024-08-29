import { CategoryEntity } from "./categoryEntity";

export interface CategoryRepository {
    getById(categoryId: number): Promise<CategoryEntity>;
}