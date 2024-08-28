import { DishRepositoryImplementation } from "../infraestructure/dishRepositoryImplementation";

export class GetAllDishes {

    dishRepositoryImplementation: DishRepositoryImplementation = new DishRepositoryImplementation();

    async getAll(){
        return await this.dishRepositoryImplementation.getAll();
    }
}