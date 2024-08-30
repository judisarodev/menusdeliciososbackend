import { DishRepositoryImplementation } from "../infraestructure/dishRepositoryImplementation";
import { CategoryEntity } from "../../category/domain/categoryEntity";

export default class GetAllDishesUseCase {

    constructor(private dishRepositoryImplementation: DishRepositoryImplementation){}

    async execute(categories: CategoryEntity[]){
        return await this.dishRepositoryImplementation.getAll(categories);
    }
}