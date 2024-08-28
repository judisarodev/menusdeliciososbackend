import { DishEntity } from "../domain/dishEntity";
import { DishRepository } from "../domain/dishRepository";
import { getSequelizeInstance } from "../../../infraestructure/config/sequelizeImplementation";

export class DishRepositoryImplementation implements DishRepository{

    sequelize: any = getSequelizeInstance();

    async getAll(): Promise<DishEntity> {
        console.log('this.sequelize.models', this.sequelize.models);
        return await this.sequelize.models.Product.findAll();
    }
    create(dish: DishEntity): DishEntity {
        throw new Error("Method not implemented.");
    }
    delete(dishId: number): DishEntity {
        throw new Error("Method not implemented.");
    }

}