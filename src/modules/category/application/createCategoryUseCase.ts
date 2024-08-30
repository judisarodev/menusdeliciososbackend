import { CategoryEntity } from "../domain/categoryEntity";
import CategoryRepositoryImplementation from "../infraestructure/categoryRepositoryImplementation";


export default class CreateCategoryUseCase {
    constructor(private categoryRepositoryImplementation: CategoryRepositoryImplementation){

    }

    async execute(categoryEntity: CategoryEntity, restaurantId: number){
        await this.categoryRepositoryImplementation.create(categoryEntity);
    }
}