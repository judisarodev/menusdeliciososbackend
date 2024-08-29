import { CategoryEntity } from "../domain/categoryEntity";
import { CategoryRepository } from "../domain/categoryRepository";
import SequelizeSetUp from "../../../infraestructure/config/sequelize";

export default class CategoryRepositoryImplementation implements CategoryRepository {
    models: any = SequelizeSetUp.getModels();

    async getById(categoryId: number): Promise<CategoryEntity> {
        const category = await this.models.Category.findOne({
            where: { categoryId },
            attributes: ['name', 'image', 'categoryId'],
        });
        const categoryEntity = new CategoryEntity(category.name, category.image, category.categoryId);
        return categoryEntity;
    }

    async getAll(): Promise<CategoryEntity[]> {
        const categories = await this.models.Category.findAll({
            attributes: ['name', 'image', 'categoryId']
        });
        const categoryEntities = [];
        for(const category of categories){
            categoryEntities.push(new CategoryEntity(category.name, category.image, category.categoryId));
        }
        return categoryEntities;
    }
}