import { DishRepositoryImplementation } from "../infraestructure/dishRepositoryImplementation";

export default class DeleteDishUseCase {

    constructor(private dishRepositoryImplementation: DishRepositoryImplementation){}

    async execute(dishId: number){
        return await this.dishRepositoryImplementation.delete(dishId);
    }
}