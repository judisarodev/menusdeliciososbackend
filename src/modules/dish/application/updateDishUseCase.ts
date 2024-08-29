import { DishEntity } from "../domain/dishEntity";
import { DishRepositoryImplementation } from "../infraestructure/dishRepositoryImplementation";

export default class UpdateDishUseCase {

    constructor(private dishRepositoryImplementation: DishRepositoryImplementation){}

    async execute(dishId: number, data: any){
        return await this.dishRepositoryImplementation.update(dishId, data);
    }
}