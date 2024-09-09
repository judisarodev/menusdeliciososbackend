import { CategoryEntity } from "../domain/categoryEntity";
import { CategoryRepository } from "../domain/categoryRepository";
import SequelizeSetUp from "../../../infraestructure/config/sequelize";

export default class CategoryRepositoryImplementation implements CategoryRepository {
    models: any = SequelizeSetUp.getModels();

    async updateImage(categoryId: number, image: string): Promise<void> {
        try{
            await this.models.Category.update({ image }, { where: { categoryId } }); 
        }catch(error){
            console.error(error);
            throw error;
        }
    }

    async getById(categoryId: number, restaurantId: number): Promise<CategoryEntity> {
        const category = await this.models.Category.findOne({
            where: { categoryId, restaurantId },
            attributes: ['name', 'image', 'icon', 'categoryId'],
            include: [{
                model: this.models.Restaurant,
                as: 'restaurant',
                attributes: ['restaurantId', 'name']
            }]
        });
        const categoryEntity = new CategoryEntity(category.name, category.image, category.icon, categoryId);
        return categoryEntity;
    }

    async getAll(restaurantId: number): Promise<CategoryEntity[]> {
        try{
            const categories = await this.models.Category.findAll({
                attributes: ['name', 'image', 'icon', 'categoryId'],
                where: { restaurantId }
            });
            const categoryEntities = [];
            for(const category of categories){
                categoryEntities.push(new CategoryEntity(category.name, category.image, category.icon, category.categoryId));
            }
            return categoryEntities;
        }catch(error){
            console.error(error);
            throw error;
        }
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