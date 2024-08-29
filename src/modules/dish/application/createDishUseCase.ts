import { DishEntity } from "../domain/dishEntity";
import { DishRepositoryImplementation } from "../infraestructure/dishRepositoryImplementation";

export default class CreateDishUseCase {

    constructor(private dishRepositoryImplementation: DishRepositoryImplementation){}

    async execute(dish: DishEntity){
        await this.dishRepositoryImplementation.create(dish);
    }
}