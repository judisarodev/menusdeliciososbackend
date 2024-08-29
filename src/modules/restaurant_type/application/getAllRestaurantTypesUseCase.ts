import RestaurantTypeRepositoryImplementation from "../infraestructure/restaurantTypeRepositoryImplementation";
export default class GetAllRestaurantTypesUseCase {
    constructor(private restaurantTypeRepositoryImplementation: RestaurantTypeRepositoryImplementation){}

    async execute(){
        return await this.restaurantTypeRepositoryImplementation.getAll(); 
    }
}