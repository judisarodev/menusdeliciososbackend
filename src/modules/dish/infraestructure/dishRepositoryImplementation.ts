import { DishEntity } from "../domain/dishEntity";
import { DishRepository } from "../domain/dishRepository";
import SequelizeSetUp from "../../../infraestructure/config/sequelize";

export class DishRepositoryImplementation implements DishRepository{

    models: any = SequelizeSetUp.getModels();

    async getAll(): Promise<DishEntity> {
        return await this.models.Product.findAll();
    }
    create(dish: DishEntity): DishEntity {
        throw new Error("Method not implemented.");
    }
    delete(dishId: number): DishEntity {
        throw new Error("Method not implemented.");
    }

}