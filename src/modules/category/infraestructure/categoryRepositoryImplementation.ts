import { CategoryEntity } from "../domain/categoryEntity";
import { CategoryRepository } from "../domain/categoryRepository";
import SequelizeSetUp from "../../../infraestructure/config/sequelize";

export default class CategoryRepositoryImplementation implements CategoryRepository {
    models: any = SequelizeSetUp.getModels();

    getById(categoryId: number): Promise<CategoryEntity> {
        return this.models.Category.findOne({ where: { categoryId } });
    }
    
}