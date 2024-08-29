import SequelizeSetUp from "../../../infraestructure/config/sequelize";
import RestaurantEntity from "../domain/restaurantEntity";
import RestaurantRepository from "../domain/restaurantRepository";

export default class RestaurantRepositoryImplementation implements RestaurantRepository{
    private models: any;

    constructor(){
        this.models = SequelizeSetUp.getModels();
    }

    async create(restaurantEntity: RestaurantEntity): Promise<void> {
        await this.models.Restaurant.create({
            name: restaurantEntity.getName(),
            email: restaurantEntity.getEmail(),
            password: restaurantEntity.getPassword(),
            phoneId: restaurantEntity.getPhone().getPhoneId(),
            addressId: restaurantEntity.getAddress().getAddressId(),
            restaurantTypeId: restaurantEntity.getRestaurantType().getRestaurantTypeId()
        });
    }
    
    async getById(restaurantId: number): Promise<RestaurantEntity> {
        return this.models.Restaurant.findOne({
            where: { restaurantId }
        });
    }

}