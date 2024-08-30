import { CategoryEntity } from "../domain/categoryEntity";
import { CategoryRepository } from "../domain/categoryRepository";
import SequelizeSetUp from "../../../infraestructure/config/sequelize";

export default class CategoryRepositoryImplementation implements CategoryRepository {
    models: any = SequelizeSetUp.getModels();

    async getById(categoryId: number, restaurantId: number): Promise<CategoryEntity> {
        const category = await this.models.Category.findOne({
            where: { categoryId, restaurantId },
            attributes: ['name', 'image', 'categoryId'],
            include: [{
                model: this.models.Restaurant,
                as: 'restaurant',
                attributes: ['restaurantId', 'name']
            }]
        });

        return category;
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

    async create(categoryEntity: CategoryEntity) {
        await this.models.Category.create({
            name: categoryEntity.getName(),
            image: categoryEntity.getImage(),
            icon: categoryEntity.getIcon(),
            restaurantId: 1, 
        });
    }
}