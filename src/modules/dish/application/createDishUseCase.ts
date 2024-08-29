import { DishEntity } from "../domain/dishEntity";
import { DishRepositoryImplementation } from "../infraestructure/dishRepositoryImplementation";

export default class CreateDishUseCase {

    constructor(private dishRepositoryImplementation: DishRepositoryImplementation){}

    async execute(dish: DishEntity){
        return await this.dishRepositoryImplementation.create(dish);
    }
}