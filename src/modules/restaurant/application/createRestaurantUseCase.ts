import RestaurantEntity from "../domain/restaurantEntity";
import RestaurantRepositoryImplementation from "../infraestructure/restaurantRepositoryImplementation";

export default class CreateRestaurantUseCase {
    constructor(private restaurantRepositoryImplementation: RestaurantRepositoryImplementation){}

    async execute(restaurant: RestaurantEntity){
        this.restaurantRepositoryImplementation.create(restaurant);
    }
}