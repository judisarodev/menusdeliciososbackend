import { DishEntity } from "../domain/dishEntity";
import { DishRepository } from "../domain/dishRepository";
import SequelizeSetUp from "../../../infraestructure/config/sequelize";
import { CategoryEntity } from "../../category/domain/categoryEntity";

export class DishRepositoryImplementation implements DishRepository{
    models: any = SequelizeSetUp.getModels();

    async update(dishId: number, data: any): Promise<DishEntity> {
        const updatedDish = await this.models.Product.update(data, { where: { dishId } });
        return updatedDish;
    }

    async getAll(categories: CategoryEntity[]): Promise<DishEntity> {
        const categoryIds = categories.map((category: CategoryEntity) => {
            return category.getCategoryId()
        });
        return await this.models.Product.findAll({
            categoryId: categoryIds
        });
    }
    
    async create(dish: DishEntity) {
        let categoryId;
        const category = dish.getCategory();
        if(category){
            categoryId = category.getCategoryId() || 1;
        }
        await this.models.Product.create({
            name: dish.getName(),
            price: dish.getPrice(),
            description: dish.getDescription(),
            image: dish.getImage(),
            categoryId
        });
    }

    async delete(dishId: number): Promise<DishEntity> {
        return await this.models.delete({ where: { dishId }, force: true });
    }

}