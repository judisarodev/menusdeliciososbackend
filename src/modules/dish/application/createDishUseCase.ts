import { DishEntity } from "../domain/dishEntity";
import { DishRepositoryImplementation } from "../infraestructure/dishRepositoryImplementation";

export default class CreateDishUseCase {

    constructor(private dishRepositoryImplementation: DishRepositoryImplementation){}

    async execute(dish: DishEntity, categoryId: number, imageId: number){
        await this.dishRepositoryImplementation.create(dish, categoryId, imageId);
    }
}