import { DishRepositoryImplementation } from "../infraestructure/dishRepositoryImplementation";

export default class GetAllDishesUseCase {

    constructor(private dishRepositoryImplementation: DishRepositoryImplementation){}

    async execute(){
        return await this.dishRepositoryImplementation.getAll();
    }
}