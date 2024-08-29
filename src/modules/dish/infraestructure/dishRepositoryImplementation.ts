import { DishEntity } from "../domain/dishEntity";
import { DishRepository } from "../domain/dishRepository";
import SequelizeSetUp from "../../../infraestructure/config/sequelize";

export class DishRepositoryImplementation implements DishRepository{
    models: any = SequelizeSetUp.getModels();

    async update(dishId: number, data: any): Promise<DishEntity> {
        const updatedDish = await this.models.Product.update(data, { where: { dishId } });
        return updatedDish;
    }

    async getAll(): Promise<DishEntity> {
        return await this.models.Product.findAll();
    }
    
    async create(dish: DishEntity): Promise<DishEntity> {
        return await this.models.Product.create(dish);
    }

    async delete(dishId: number): Promise<DishEntity> {
        return await this.models.delete({ where: { dishId }, force: true });
    }

}