import SequelizeSetUp from "../../../infraestructure/config/sequelize";
import RestaurantTypeEntity from "../domain/restaurantTypeEntity";
import RestaurantTypeRepository from "../domain/restaurantTypeRepository";

export default class RestaurantTypeRepositoryImplementation implements RestaurantTypeRepository{
    private models: any; 

    constructor(){
        this.models = SequelizeSetUp.getModels();
    }

    async getAll(): Promise<RestaurantTypeEntity[]> {
        return await this.models.RestaurantType.findAll();
    }

}