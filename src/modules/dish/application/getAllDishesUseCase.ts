import { DishRepositoryImplementation } from "../infraestructure/dishRepositoryImplementation";

export default class GetAllDishesUseCase {

    constructor(private dishRepositoryImplementation: DishRepositoryImplementation){}

    async execute(restaurantId: number){
        return await this.dishRepositoryImplementation.getAll(restaurantId);
    }
}