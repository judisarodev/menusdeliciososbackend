import { DishRepositoryImplementation } from "../infraestructure/dishRepositoryImplementation";

export default class GetDishUseCase {
    constructor(private dishRepositoryImplementation: DishRepositoryImplementation){

    }

    async execute(dishId: number) {
        return await this.dishRepositoryImplementation.get(dishId);
    }
}