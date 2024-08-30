import RestaurantEntity from "../domain/restaurantEntity";
import RestaurantRepositoryImplementation from "../infraestructure/restaurantRepositoryImplementation";

export default class GetRestaurantByIdUseCase {
    constructor(private restaurantRepositoryImplementation: RestaurantRepositoryImplementation){}

    async execute(restaurantId: number){
        return await this.restaurantRepositoryImplementation.getById(restaurantId);
    }
}