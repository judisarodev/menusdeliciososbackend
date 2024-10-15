import { CategoryEntity } from "../domain/categoryEntity";
import { CategoryRepository } from "../domain/categoryRepository";
import SequelizeSetUp from "../../../infraestructure/config/sequelize";

export default class CategoryRepositoryImplementation implements CategoryRepository {
    models: any = SequelizeSetUp.getModels();
    
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
        const categoryEntity = new CategoryEntity(category.name, category.icon, categoryId);
        return categoryEntity;
    }

    async create(categoryEntity: CategoryEntity, menuId: number): Promise<void> {
        await this.models.Category.create({
            name: categoryEntity.getName(),
            icon: categoryEntity.getIcon(),
            menuId
        });
    }

    async delete(categoryId: number): Promise<void>{
        try{
            await this.models.Product.destroy({
                where: {
                    categoryId,
                }
            });
    
            await this.models.Category.destroy({
                where: {
                    categoryId,
                }
            });
        }catch(error){
            console.log(error);
            throw error; 
        }
    }

    async update(name: string, icon: string, categoryId: number): Promise<void>{
        try{
            await this.models.Category.update({
                name, icon
            }, {
                where: {
                    categoryId,
                }
            });
        }catch(error){
            console.log(error);
            throw error; 
        }
    }
}