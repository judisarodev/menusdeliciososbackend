import { DishRepositoryImplementation } from "../infraestructure/dishRepositoryImplementation";

export class GetAllDishesUseCase {

    dishRepositoryImplementation: DishRepositoryImplementation = new DishRepositoryImplementation();

    async getAll(){
        return await this.dishRepositoryImplementation.getAll();
    }
}