import { CategoryEntity } from "./categoryEntity";

export interface CategoryRepository {
    getById(categoryId: number): Promise<CategoryEntity>;
    getAll(): Promise<CategoryEntity[]>;
    create(categoryEntity: CategoryEntity): void;
}